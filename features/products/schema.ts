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
import { productStatuses, type ProductInput, type ProductStatus } from "./types";

export function parseProductForm(source: FormSource): ValidationResult<ProductInput> {
  const status = readText(source, "status");
  const progress = readText(source, "progress");
  const tags = readText(source, "tags");
  const title = readLocalized(source, "title");
  const description = readLocalized(source, "description");

  const errors = collectErrors({
    status: checkOption(status, productStatuses),
    progress: checkInteger(progress, { min: 0, max: 100 }),
    tags: checkText(tags, { max: 200, optional: true }),
    ...checkLocalized("title", title, (text) => checkText(text, { max: 100 })),
    ...checkLocalized("description", description, (text) => checkText(text, { max: 300 })),
  });
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      status: status as ProductStatus,
      progress: Number(progress),
      title,
      description,
      tags: splitList(tags),
      featured: readBoolean(source, "featured"),
      published: readBoolean(source, "published"),
    },
  };
}
