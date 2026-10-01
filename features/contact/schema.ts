import {
  checkEmail,
  checkOption,
  checkText,
  collectErrors,
  readText,
  type FormSource,
  type ValidationResult,
} from "@/lib/validation";
import {
  budgets,
  projectTypes,
  timelines,
  type ContactMessageInput,
  type ProjectRequestInput,
} from "./types";

// Runs in the browser before sending, and again on the server (mock actions;
// the real backend must apply the same rules).

/** Hidden spam-trap input; real users never fill it. */
export const HONEYPOT_FIELD = "company_website";

export function validateProjectRequest(source: FormSource): ValidationResult<ProjectRequestInput> {
  const values = {
    projectType: readText(source, "projectType"),
    budget: readText(source, "budget"),
    timeline: readText(source, "timeline"),
    description: readText(source, "description"),
    name: readText(source, "name"),
    email: readText(source, "email"),
  };

  const errors = collectErrors({
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

export function validateContactMessage(source: FormSource): ValidationResult<ContactMessageInput> {
  const values = {
    name: readText(source, "name"),
    email: readText(source, "email"),
    subject: readText(source, "subject"),
    message: readText(source, "message"),
  };

  const errors = collectErrors({
    name: checkText(values.name, { max: 100 }),
    email: checkEmail(values.email),
    subject: checkText(values.subject, { max: 150 }),
    message: checkText(values.message, { min: 10, max: 5000 }),
  });

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: values };
}
