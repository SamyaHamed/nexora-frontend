export type ProductStatus = "planning" | "development" | "beta" | "launched";

export const projectCategories = ["website", "mobileApp", "customSystem", "uxui"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectKey = "p1" | "p2" | "p3" | "p4" | "p5" | "p6";

export type Project = {
  key: ProjectKey;
  category: ProjectCategory;
  tags: string[];
  /** Shown in the home page's "Featured projects" section. */
  featured?: boolean;
};

export function isProjectCategory(value: unknown): value is ProjectCategory {
  return typeof value === "string" && (projectCategories as readonly string[]).includes(value);
}
