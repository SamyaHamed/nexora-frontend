"use client";

import { useState, type FormEvent } from "react";
import { HONEYPOT_FIELD, type FieldErrors, type ValidationResult } from "./schema";

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

/** Validate → send → track status for an uncontrolled <form noValidate>. */
export function useFormSubmission<T>(
  validate: (formData: FormData) => ValidationResult<T>,
  send: (data: T) => Promise<unknown>,
) {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors<T>>({});

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

function focusFirstInvalid(form: HTMLFormElement, names: string[]) {
  for (const element of Array.from(form.elements)) {
    if (
      element instanceof HTMLElement &&
      "name" in element &&
      names.includes(String(element.name))
    ) {
      element.focus();
      return;
    }
  }
}
