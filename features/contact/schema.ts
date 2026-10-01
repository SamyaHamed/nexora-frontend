import {
  budgets,
  projectTypes,
  timelines,
  type ContactMessageInput,
  type ProjectRequestInput,
} from "./types";

// Plain validation, shared by both forms. Keep the limits in sync with the
// backend's validation (requirements: validate on frontend AND backend).

export type ValidationCode = "required" | "email" | "tooShort" | "tooLong" | "invalidOption";

export type ValidationError = { code: ValidationCode; limit?: number };

export type FieldErrors<T> = Partial<Record<keyof T, ValidationError>>;

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: FieldErrors<T> };

/** Hidden spam-trap input; real users never fill it. */
export const HONEYPOT_FIELD = "company_website";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function checkText(value: string, { min = 1, max }: { min?: number; max: number }): ValidationError | null {
  if (!value) return { code: "required" };
  if (value.length < min) return { code: "tooShort", limit: min };
  if (value.length > max) return { code: "tooLong", limit: max };
  return null;
}

function checkEmail(value: string): ValidationError | null {
  if (!value) return { code: "required" };
  if (value.length > 200 || !EMAIL_PATTERN.test(value)) return { code: "email" };
  return null;
}

function checkOption(value: string, options: readonly string[]): ValidationError | null {
  if (!value) return { code: "required" };
  return options.includes(value) ? null : { code: "invalidOption" };
}

function collect<T>(checks: Record<keyof T, ValidationError | null>): FieldErrors<T> {
  const errors: FieldErrors<T> = {};
  for (const key of Object.keys(checks) as (keyof T)[]) {
    const error = checks[key];
    if (error) errors[key] = error;
  }
  return errors;
}

export function validateProjectRequest(formData: FormData): ValidationResult<ProjectRequestInput> {
  const values = {
    projectType: text(formData, "projectType"),
    budget: text(formData, "budget"),
    timeline: text(formData, "timeline"),
    description: text(formData, "description"),
    name: text(formData, "name"),
    email: text(formData, "email"),
  };

  const errors = collect<ProjectRequestInput>({
    projectType: checkOption(values.projectType, projectTypes),
    budget: checkOption(values.budget, budgets),
    timeline: checkOption(values.timeline, timelines),
    description: checkText(values.description, { min: 20, max: 5000 }),
    name: checkText(values.name, { max: 100 }),
    email: checkEmail(values.email),
  });

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  // Options were checked against their lists above.
  return { ok: true, data: values as ProjectRequestInput };
}

export function validateContactMessage(formData: FormData): ValidationResult<ContactMessageInput> {
  const values = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    subject: text(formData, "subject"),
    message: text(formData, "message"),
  };

  const errors = collect<ContactMessageInput>({
    name: checkText(values.name, { max: 100 }),
    email: checkEmail(values.email),
    subject: checkText(values.subject, { max: 150 }),
    message: checkText(values.message, { min: 10, max: 5000 }),
  });

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: values };
}
