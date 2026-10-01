import type { ProductStatus } from "../types";
import { StatusBadge } from "./StatusBadge";

export type ProductRowProps = {
  title: string;
  description: string;
  status: ProductStatus;
  statusLabel: string;
  /** 0–100 */
  progress: number;
  progressLabel: string;
  tags: string[];
};

export function ProductRow({
  title,
  description,
  status,
  statusLabel,
  progress,
  progressLabel,
  tags,
}: ProductRowProps) {
  const value = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <article className="grid items-center gap-6 rounded-[var(--radius-lg)] border border-[color:var(--color-border-card)] bg-[color:var(--color-card)] p-7 shadow-[var(--shadow-md)] md:grid-cols-2">
      <div className="flex items-center gap-5">
        {/* Placeholder until each product has its own icon */}
        <span
          aria-hidden="true"
          className="size-14 shrink-0 rounded-[var(--radius-md)] bg-[color:var(--color-brand-soft)]"
        />
        <div>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">{title}</h2>
          <p className="mt-1.5 text-sm text-[color:var(--color-text-muted)]">{description}</p>
        </div>
      </div>
      <div>
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <StatusBadge status={status} label={statusLabel} />
          <span aria-hidden="true" className="font-mono text-[0.8125rem] font-medium text-[color:var(--color-text-muted)]">
            {value}%
          </span>
        </div>
        <div
          role="progressbar"
          aria-label={progressLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          className="h-2 overflow-hidden rounded-full bg-[color:var(--color-surface-hover)]"
        >
          {/* Inline width: the value is data, not a design token */}
          <div
            className="h-full rounded-full bg-[color:var(--color-brand)]"
            style={{ width: `${value}%` }}
          />
        </div>
        <p className="mt-2.5 font-mono text-xs text-[color:var(--color-text-muted)]">
          {tags.join(" · ")}
        </p>
      </div>
    </article>
  );
}
