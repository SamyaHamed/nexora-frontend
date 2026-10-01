import { routing } from "@/i18n/routing";
import type { Localized } from "./localized";

// Small validation toolkit shared by public forms and dashboard actions.
// Error codes map to messages under "Validation" in messages/*.json.

export type ValidationCode =
  | "required"
  | "email"
  | "url"
  | "tooShort"
  | "tooLong"
  | "invalidOption"
  | "number";

export type ValidationError = { code: ValidationCode; limit?: number };

/** Keyed by form field name, e.g. "email" or "title.en". */
export type FieldErrors = Record<string, ValidationError>;

export type ValidationResult<T> = { ok: true; data: T } | { ok: false; errors: FieldErrors };

export type FormSource = FormData | Record<string, unknown>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function readText(source: FormSource, key: string): string {
  const value = source instanceof FormData ? source.get(key) : source[key];
  return typeof value === "string" ? value.trim() : "";
}

export function readBoolean(source: FormSource, key: string): boolean {
  const value = source instanceof FormData ? source.get(key) : source[key];
  return value === "on" || value === "true" || value === true;
}

export function checkText(
  value: string,
  { min = 1, max, optional = false }: { min?: number; max: number; optional?: boolean },
): ValidationError | null {
  if (!value) return optional ? null : { code: "required" };
  if (value.length < min) return { code: "tooShort", limit: min };
  if (value.length > max) return { code: "tooLong", limit: max };
  return null;
}

export function checkEmail(value: string): ValidationError | null {
  if (!value) return { code: "required" };
  if (value.length > 200 || !EMAIL_PATTERN.test(value)) return { code: "email" };
  return null;
}

export function checkUrl(value: string, { optional = false } = {}): ValidationError | null {
  if (!value) return optional ? null : { code: "required" };
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? null : { code: "url" };
  } catch {
    return { code: "url" };
  }
}

export function checkOption(value: string, options: readonly string[]): ValidationError | null {
  if (!value) return { code: "required" };
  return options.includes(value) ? null : { code: "invalidOption" };
}

export function checkInteger(value: string, { min, max }: { min: number; max: number }): ValidationError | null {
  if (!value) return { code: "required" };
  const number = Number(value);
  return Number.isInteger(number) && number >= min && number <= max ? null : { code: "number" };
}

/** Drops passing checks; returns the failures keyed by field name. */
export function collectErrors(checks: Record<string, ValidationError | null>): FieldErrors {
  const errors: FieldErrors = {};
  for (const [field, error] of Object.entries(checks)) {
    if (error) errors[field] = error;
  }
  return errors;
}

/** "a, b ,, c" → ["a", "b", "c"] */
export function splitList(value: string, separator: string | RegExp = ","): string[] {
  return value
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
}

/** Reads "<key>.en", "<key>.ar"… into one Localized value. */
export function readLocalized(source: FormSource, key: string): Localized {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, readText(source, `${key}.${locale}`)]),
  ) as Localized;
}

/** One check per language, keyed "<field>.<locale>" to match the inputs. */
export function checkLocalized(
  field: string,
  value: Localized,
  check: (text: string) => ValidationError | null,
): Record<string, ValidationError | null> {
  return Object.fromEntries(
    routing.locales.map((locale) => [`${field}.${locale}`, check(value[locale])]),
  );
}
