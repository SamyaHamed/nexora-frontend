"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const items = [
  { key: "overview", href: "/dashboard", icon: "M3 3h7v9H3z M14 3h7v5h-7z M14 12h7v9h-7z M3 16h7v5H3z" },
  { key: "requests", href: "/dashboard/requests", icon: "M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" },
  { key: "messages", href: "/dashboard/messages", icon: "M4 4h16v16H4z M4 6l8 7 8-7" },
  { key: "projects", href: "/dashboard/projects", icon: "M3 7h18v13H3z M8 7V4h8v3" },
  { key: "services", href: "/dashboard/services", icon: "M8 7l-5 5 5 5 M16 7l5 5-5 5" },
  { key: "comingSoon", href: "/dashboard/coming-soon", icon: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2" },
  {
    key: "settings",
    href: "/dashboard/settings",
    icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
  },
] as const;

export type SidebarNavProps = {
  /** Attention counts shown next to a nav item, e.g. { requests: 2 }. */
  counts?: Partial<Record<(typeof items)[number]["key"], number>>;
};

// Vertical in the sidebar on desktop; a horizontally scrolling strip on phones.
export function SidebarNav({ counts = {} }: SidebarNavProps) {
  const t = useTranslations("Dashboard.nav");
  const pathname = usePathname();

  return (
    <nav aria-label={t("label")} className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:overflow-visible lg:px-0">
      <ul className="flex gap-1 lg:flex-col">
        {items.map((item) => {
          const active =
            item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
          const count = counts[item.key] ?? 0;
          return (
            <li key={item.key} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-[var(--radius-md)] px-3.5 text-sm whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]",
                  active
                    ? "bg-[color:var(--color-brand-soft)] font-semibold text-[color:var(--color-text-primary)]"
                    : "font-medium text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-surface-hover)] hover:text-[color:var(--color-text-primary)]",
                )}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn("size-5 shrink-0", active && "text-[color:var(--color-brand-text)]")}
                >
                  <path d={item.icon} />
                </svg>
                <span className="flex-1">{t(item.key)}</span>
                {count > 0 ? (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[color:var(--color-brand)] px-1.5 text-[0.6875rem] font-semibold text-[color:var(--color-on-brand)]">
                    {count}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
