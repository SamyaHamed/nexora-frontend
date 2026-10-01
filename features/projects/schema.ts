import {
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
import { projectCategories, type ProjectCategory, type ProjectInput } from "./types";

export function parseProjectForm(source: FormSource): ValidationResult<ProjectInput> {
  const category = readText(source, "category");
  const tags = readText(source, "tags");
  const title = readLocalized(source, "title");
  const description = readLocalized(source, "description");

  const errors = collectErrors({
    category: checkOption(category, projectCategories),
    tags: checkText(tags, { max: 200, optional: true }),
    ...checkLocalized("title", title, (text) => checkText(text, { max: 100 })),
    ...checkLocalized("description", description, (text) => checkText(text, { max: 400 })),
  });
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      category: category as ProjectCategory,
      title,
      description,
      tags: splitList(tags),
      featured: readBoolean(source, "featured"),
      published: readBoolean(source, "published"),
    },
  };
}
