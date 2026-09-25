"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LangSwitcher() {
  const t = useTranslations("LangSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="flex items-center gap-1 rounded-full border border-[color:var(--color-border)] p-1 text-sm"
    >
      {routing.locales.map((loc) => {
        const isActive = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            disabled={isActive}
            aria-current={isActive ? "true" : undefined}
            className={`rounded-full px-3 py-1 uppercase transition-colors ${
              isActive
                ? "bg-[color:var(--color-brand)] text-[color:var(--color-on-brand)]"
                : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)]"
            }`}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
