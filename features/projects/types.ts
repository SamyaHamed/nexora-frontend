import type { Localized } from "@/lib/localized";

export const projectCategories = ["website", "mobileApp", "customSystem", "uxui"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  category: ProjectCategory;
  title: Localized;
  description: Localized;
  /** Technology names; the same in every language. */
  tags: string[];
  /** Shown in the home page's "Featured projects" section. */
  featured: boolean;
  published: boolean;
  createdAt: string;
};

export type ProjectInput = Omit<Project, "id" | "createdAt">;

export function isProjectCategory(value: unknown): value is ProjectCategory {
  return typeof value === "string" && (projectCategories as readonly string[]).includes(value);
}
