import { socialKeys } from "@/config/site";
import {
  checkEmail,
  checkLocalized,
  checkText,
  checkUrl,
  collectErrors,
  readLocalized,
  readText,
  type FormSource,
  type ValidationResult,
} from "@/lib/validation";
import type { SiteSettings } from "./types";

export function parseSettingsForm(source: FormSource): ValidationResult<SiteSettings> {
  const email = readText(source, "email");
  const phone = readText(source, "phone");
  const address = readLocalized(source, "address");
  const workingHours = readLocalized(source, "workingHours");
  const social = Object.fromEntries(
    socialKeys.map((key) => [key, readText(source, `social.${key}`)]),
  ) as SiteSettings["social"];

  const errors = collectErrors({
    email: checkEmail(email),
    phone: checkText(phone, { max: 40 }),
    ...checkLocalized("address", address, (text) => checkText(text, { max: 150 })),
    ...checkLocalized("workingHours", workingHours, (text) => checkText(text, { max: 100 })),
    ...Object.fromEntries(socialKeys.map((key) => [`social.${key}`, checkUrl(social[key])])),
  });
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return { ok: true, data: { email, phone, address, workingHours, social } };
}
