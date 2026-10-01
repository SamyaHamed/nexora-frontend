import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CardProps = ComponentPropsWithoutRef<"div"> & {
  image?: ReactNode;
  /** Classes for the media slot; defaults to a 16:9 frame. */
  mediaClassName?: string;
  /** Lift on hover — use when the card (or a link inside it) is clickable. */
  interactive?: boolean;
};

export function Card({
  image,
  mediaClassName,
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border-card)] bg-[color:var(--color-card)] shadow-[var(--shadow-md)]",
        interactive &&
          "transition-[box-shadow,translate] duration-[var(--duration-normal)] ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] motion-reduce:hover:translate-y-0",
        className,
      )}
      {...props}
    >
      {image ? (
        <div className={cn("relative w-full overflow-hidden", mediaClassName ?? "aspect-video")}>
          {image}
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">{children}</div>
    </div>
  );
}
