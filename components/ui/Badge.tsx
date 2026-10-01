import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "neutral" | "brand" | "success" | "warning" | "info";

export type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: BadgeVariant;
  /** Leading status dot, for "In development" / "Planning" style labels. */
  dot?: boolean;
};

const variantClasses: Record<BadgeVariant, string> = {
  neutral:
    "border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-hover)] text-[color:var(--color-text-muted)]",
  brand:
    "border-transparent bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand-text)]",
  success:
    "border-[color:var(--color-success)]/30 bg-[color:var(--color-success)]/10 text-[color:var(--color-success)]",
  warning:
    "border-[color:var(--color-warning)]/30 bg-[color:var(--color-warning)]/10 text-[color:var(--color-warning)]",
  info: "border-[color:var(--color-info)]/30 bg-[color:var(--color-info)]/10 text-[color:var(--color-info)]",
};

export function Badge({
  variant = "neutral",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-sm)] border px-3 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {dot ? (
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      ) : null}
      {children}
    </span>
  );
}
