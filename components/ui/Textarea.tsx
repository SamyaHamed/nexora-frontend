"use client";

import { forwardRef, useId, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./Label";

export type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  label?: string;
  error?: string;
  helperText?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, error, helperText, id, required, rows = 4, className, ...props },
    ref,
  ) {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const errorId = error ? `${textareaId}-error` : undefined;
    const helperId = helperText ? `${textareaId}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <Label htmlFor={textareaId} required={required}>
            {label}
          </Label>
        ) : null}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          required={required}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          className={cn(
            "resize-y rounded-[var(--radius-md)] border bg-[color:var(--color-card)] px-3.5 py-2.5 text-[color:var(--color-text-primary)] transition-[border-color,box-shadow] placeholder:text-[color:var(--color-text-subtle)] focus-visible:border-[color:var(--color-brand)] focus-visible:shadow-[var(--shadow-focus)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-[color:var(--color-danger)]" : "border-[color:var(--color-border)]",
            className,
          )}
          {...props}
        />
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
  },
);
