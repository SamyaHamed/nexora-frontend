import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Link } from "@/i18n/navigation";

export type DashboardHeaderProps = {
  title: string;
  description?: string;
  /** Buttons/filters shown at the end of the header row. */
  actions?: ReactNode;
  back?: { href: string; label: string };
};

export function DashboardHeader({ title, description, actions, back }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      {back ? (
        <Link
          href={back.href}
          className="inline-flex items-center gap-1.5 self-start rounded-[var(--radius-sm)] text-sm font-medium text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]"
        >
          <ArrowIcon className="rotate-180 rtl:rotate-0" />
          {back.label}
        </Link>
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[1.75rem] font-bold text-[color:var(--color-text-primary)] rtl:leading-[1.4]">
            {title}
          </h1>
          {description ? (
            <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}
