import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "neutral" | "brand" | "success" | "warning" | "info";

export type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  neutral:
    "border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)]",
  brand:
    "border-[color:var(--color-brand)]/30 bg-[color:var(--color-brand)]/15 text-[color:var(--color-brand-hover)]",
  success:
    "border-[color:var(--color-success)]/30 bg-[color:var(--color-success)]/15 text-[color:var(--color-success)]",
  warning:
    "border-[color:var(--color-warning)]/30 bg-[color:var(--color-warning)]/15 text-[color:var(--color-warning)]",
  info: "border-[color:var(--color-info)]/30 bg-[color:var(--color-info)]/15 text-[color:var(--color-info)]",
};

export function Badge({ variant = "neutral", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
