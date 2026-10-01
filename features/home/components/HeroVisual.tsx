import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";
import { heroStack } from "../data";

// Illustrative product snapshot beside the hero copy. Purely decorative
// content, so it's hidden from assistive tech to keep the hero concise.
export async function HeroVisual() {
  const t = await getTranslations("Home.hero.visual");

  return (
    <div aria-hidden="true" className="grid grid-cols-2 gap-4">
      <div className="col-span-2 flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[color:var(--color-border-card)] bg-[color:var(--color-card)] p-6 shadow-[var(--shadow-lg)]">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">
            {t("requestTitle")}
          </span>
          <Badge variant="brand" dot>
            {t("requestStatus")}
          </Badge>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[color:var(--color-surface-hover)]">
          <div className="h-full w-[62%] rounded-full bg-[color:var(--color-brand)]" />
        </div>
        <ul className="flex flex-wrap gap-2">
          {heroStack.map((tech) => (
            <li
              key={tech}
              className="rounded-[var(--radius-sm)] bg-[color:var(--color-surface-hover)] px-2 py-1.5 font-mono text-xs leading-none text-[color:var(--color-text-muted)]"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex min-h-36 flex-col justify-between rounded-[var(--radius-lg)] bg-[color:var(--color-inverse-bg)] p-6 text-[color:var(--color-inverse-text)]">
        <span className="text-sm font-medium opacity-80">{t("fromIdea")}</span>
        <span className="font-display text-2xl font-bold">{t("toLaunch")}</span>
      </div>
      <div className="flex min-h-36 flex-col justify-between rounded-[var(--radius-lg)] bg-[color:var(--color-brand-soft)] p-6">
        <span className="text-sm font-medium text-[color:var(--color-brand-text)]">
          {t("bilingual")}
        </span>
        <span className="font-display text-2xl font-bold text-[color:var(--color-text-primary)]">
          {t("rtlReady")}
        </span>
      </div>
    </div>
  );
}
