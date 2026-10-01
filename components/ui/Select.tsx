"use client";

import { forwardRef, useId, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./Label";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = Omit<ComponentPropsWithoutRef<"select">, "children"> & {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, helperText, options, placeholder, id, required, className, ...props },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = error ? `${selectId}-error` : undefined;
  const helperId = helperText ? `${selectId}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <Label htmlFor={selectId} required={required}>
          {label}
        </Label>
      ) : null}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          required={required}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          defaultValue={props.defaultValue ?? (placeholder ? "" : undefined)}
          className={cn(
            "h-11 w-full appearance-none rounded-[var(--radius-md)] border bg-[color:var(--color-card)] ps-3.5 pe-10 text-[color:var(--color-text-primary)] transition-[border-color,box-shadow] focus-visible:border-[color:var(--color-brand)] focus-visible:shadow-[var(--shadow-focus)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-[color:var(--color-danger)]" : "border-[color:var(--color-border)]",
            className,
          )}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[color:var(--color-text-subtle)]"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-[color:var(--color-danger)]">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-sm text-[color:var(--color-text-subtle)]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
