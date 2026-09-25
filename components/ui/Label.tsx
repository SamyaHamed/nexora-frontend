import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type LabelProps = ComponentPropsWithoutRef<"label"> & {
  required?: boolean;
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, children, required, ...props },
  ref,
) {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium text-[color:var(--color-text-primary)]",
        className,
      )}
      {...props}
    >
      {children}
      {required ? (
        <span aria-hidden="true" className="ms-1 text-[color:var(--color-danger)]">
          *
        </span>
      ) : null}
    </label>
  );
});
