import { getTranslations } from "next-intl/server";
import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { Logo } from "@/components/layout/Logo";
import { logout } from "@/features/auth/actions";
import type { AdminUser } from "@/features/auth/types";
import { Link } from "@/i18n/navigation";
import { SidebarNav, type SidebarNavProps } from "./SidebarNav";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export type SidebarProps = {
  admin: AdminUser;
  counts: SidebarNavProps["counts"];
};

export async function Sidebar({ admin, counts }: SidebarProps) {
  const t = await getTranslations("Dashboard.nav");

  return (
    <aside className="flex flex-col gap-4 border-b border-[color:var(--color-border-subtle)] bg-[color:var(--color-card)] px-4 py-4 lg:sticky lg:top-0 lg:h-dvh lg:gap-6 lg:border-e lg:border-b-0 lg:py-6">
      <div className="flex items-center justify-between gap-3 px-2">
        <Logo />
        <div className="lg:hidden">
          <LangSwitcher />
        </div>
      </div>

      <SidebarNav counts={counts} />

      <div className="mt-auto hidden flex-col gap-4 border-t border-[color:var(--color-border-subtle)] px-2 pt-4 lg:flex">
        <LangSwitcher />
        <Link
          href="/"
          className="rounded-[var(--radius-sm)] text-sm font-medium text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]"
        >
          {t("viewSite")}
        </Link>
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-[color:var(--color-inverse-bg)] text-[0.8125rem] font-semibold text-[color:var(--color-inverse-text)]"
          >
            {initials(admin.name)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[color:var(--color-text-primary)]">{admin.name}</p>
            <p className="text-xs text-[color:var(--color-text-muted)]">{t("role")}</p>
          </div>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm font-medium text-[color:var(--color-text-muted)] underline-offset-4 hover:text-[color:var(--color-danger)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]"
          >
            {t("signOut")}
          </button>
        </form>
      </div>

      {/* Phones: compact account row under the nav */}
      <div className="flex items-center justify-between gap-3 px-2 text-sm lg:hidden">
        <span className="truncate text-[color:var(--color-text-muted)]">{admin.name}</span>
        <form action={logout}>
          <button
            type="submit"
            className="font-medium text-[color:var(--color-text-muted)] underline-offset-4 hover:text-[color:var(--color-danger)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]"
          >
            {t("signOut")}
          </button>
        </form>
      </div>
    </aside>
  );
}
