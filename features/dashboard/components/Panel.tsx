import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PanelProps = {
  title?: string;
  /** Shown at the end of the title row (a link or badge). */
  aside?: ReactNode;
  /** Remove body padding, e.g. for edge-to-edge tables. */
  flush?: boolean;
  className?: string;
  children: ReactNode;
};

export function Panel({ title, aside, flush = false, className, children }: PanelProps) {
  return (
    <section
      className={cn(
        "min-w-0 overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border-card)] bg-[color:var(--color-card)] shadow-[var(--shadow-sm)]",
        className,
      )}
    >
      {title ? (
        <div className="flex items-center justify-between gap-3 px-6 pt-5 pb-4">
          <h2 className="font-display text-lg font-semibold text-[color:var(--color-text-primary)]">
            {title}
          </h2>
          {aside}
        </div>
      ) : null}
      <div className={cn(!flush && "px-6 pb-6", !flush && !title && "pt-6")}>{children}</div>
    </section>
  );
}

export type StatCardProps = {
  label: string;
  value: number;
  hint: string;
};

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-border-card)] bg-[color:var(--color-card)] px-6 py-5 shadow-[var(--shadow-sm)]">
      <dt className="text-[0.8125rem] text-[color:var(--color-text-muted)]">{label}</dt>
      <dd className="mt-2 font-display text-[2rem] leading-[1.1] font-extrabold tracking-[var(--tracking-display)] text-[color:var(--color-text-primary)]">
        {value}
      </dd>
      <dd className="mt-1.5 text-[0.8125rem] text-[color:var(--color-text-muted)]">{hint}</dd>
    </div>
  );
}
