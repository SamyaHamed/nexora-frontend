import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type ContainerProps = ComponentPropsWithoutRef<"div">;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container-width)] px-5 sm:px-8 lg:px-12",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
