import {
  checkInteger,
  checkLocalized,
  checkOption,
  checkText,
  collectErrors,
  readBoolean,
  readLocalized,
  readText,
  splitList,
  type FormSource,
  type ValidationResult,
} from "@/lib/validation";
import { serviceIcons, type ServiceIconName, type ServiceInput } from "./types";

export function parseServiceForm(source: FormSource): ValidationResult<ServiceInput> {
  const icon = readText(source, "icon");
  const order = readText(source, "order");
  const title = readLocalized(source, "title");
  const description = readLocalized(source, "description");
  // One feature per line.
  const featuresText = readLocalized(source, "features");

  const errors = collectErrors({
    icon: checkOption(icon, serviceIcons),
    order: checkInteger(order, { min: 1, max: 999 }),
    ...checkLocalized("title", title, (text) => checkText(text, { max: 80 })),
    ...checkLocalized("description", description, (text) => checkText(text, { max: 300 })),
    ...checkLocalized("features", featuresText, (text) =>
      checkText(text, { max: 600, optional: true }),
    ),
  });
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      icon: icon as ServiceIconName,
      order: Number(order),
      title,
      description,
      features: {
        en: splitList(featuresText.en, /\r?\n/),
        ar: splitList(featuresText.ar, /\r?\n/),
      },
      published: readBoolean(source, "published"),
    },
  };
}
