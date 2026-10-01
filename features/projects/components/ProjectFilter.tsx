import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { projectCategories, type ProjectCategory } from "../types";

export type ProjectFilterProps = {
  active: ProjectCategory | null;
};

// Plain links (?category=…) rather than client state: filtered views are
// shareable, server-rendered, and work without JavaScript.
export async function ProjectFilter({ active }: ProjectFilterProps) {
  const t = await getTranslations("Projects");
  const options: (ProjectCategory | null)[] = [null, ...projectCategories];

  return (
    <nav aria-label={t("filterLabel")}>
      <ul className="flex flex-wrap gap-2">
        {options.map((category) => {
          const isActive = category === active;
          return (
            <li key={category ?? "all"}>
              <Link
                href={category ? { pathname: "/projects", query: { category } } : "/projects"}
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex h-10 items-center rounded-full border px-[1.125rem] text-sm font-medium transition-colors duration-[var(--duration-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]",
                  isActive
                    ? "border-[color:var(--color-inverse-bg)] bg-[color:var(--color-inverse-bg)] text-[color:var(--color-inverse-text)]"
                    : "border-[color:var(--color-border)] bg-[color:var(--color-card)] text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-surface-hover)]",
                )}
              >
                {t(`categories.${category ?? "all"}`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
