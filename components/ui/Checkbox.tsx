import { useId, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type CheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  label: string;
  helperText?: string;
};

export function Checkbox({ label, helperText, id, className, ...props }: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <input
        id={inputId}
        type="checkbox"
        aria-describedby={helperId}
        className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-[var(--radius-sm)] accent-[color:var(--color-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]"
        {...props}
      />
      <div>
        <label htmlFor={inputId} className="cursor-pointer text-sm font-medium text-[color:var(--color-text-primary)]">
          {label}
        </label>
        {helperText ? (
          <p id={helperId} className="text-sm text-[color:var(--color-text-subtle)]">
            {helperText}
          </p>
        ) : null}
      </div>
    </div>
  );
}
