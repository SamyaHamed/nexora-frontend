"use client";

import { useState, type FormEvent } from "react";
import { focusFirstInvalid } from "@/lib/focus-first-invalid";
import type { FieldErrors, ValidationResult } from "@/lib/validation";
import { HONEYPOT_FIELD } from "./schema";

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

/** Validate → send → track status for an uncontrolled <form noValidate>. */
export function useFormSubmission<T>(
  validate: (formData: FormData) => ValidationResult<T>,
  send: (data: T) => Promise<unknown>,
) {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Bots fill every field; pretend it worked so they don't retry.
    if (formData.get(HONEYPOT_FIELD)) {
      setStatus("success");
      return;
    }

    const result = validate(formData);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus("idle");
      focusFirstInvalid(form, Object.keys(result.errors));
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      await send(result.data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setErrors({});
    setStatus("idle");
  }

  return { status, errors, handleSubmit, reset };
}
