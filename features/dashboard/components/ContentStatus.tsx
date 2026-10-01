import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";

/** Published/Draft (+ Featured) badges for content tables. */
export async function ContentStatus({ published, featured }: { published: boolean; featured?: boolean }) {
  const t = await getTranslations("Dashboard.common");
  return (
    <span className="flex flex-wrap gap-1.5">
      <Badge variant={published ? "success" : "neutral"}>{published ? t("published") : t("draft")}</Badge>
      {featured ? <Badge variant="brand">{t("featured")}</Badge> : null}
    </span>
  );
}

export const editLinkClass =
  "inline-flex h-9 items-center rounded-[var(--radius-md)] border border-[color:var(--color-border)] px-3.5 text-sm font-semibold hover:bg-[color:var(--color-surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]";
