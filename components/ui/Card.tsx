import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CardProps = ComponentPropsWithoutRef<"div"> & {
  image?: ReactNode;
};

export function Card({ image, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border-subtle)] bg-[color:var(--color-card)] shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:border-[color:var(--color-border)] hover:shadow-[var(--shadow-md)]",
        className,
      )}
      {...props}
    >
      {image ? (
        <div className="aspect-video w-full overflow-hidden">{image}</div>
      ) : null}
      <div className="p-6">{children}</div>
    </div>
  );
}
