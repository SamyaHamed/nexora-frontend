"use client";

import { useState, useTransition, type FormEvent } from "react";
import type { ActionState } from "@/lib/action-state";
import { focusFirstInvalid } from "@/lib/focus-first-invalid";

/**
 * Submits a form to a Server Action without React's automatic form reset,
 * so a validation error keeps everything the admin typed.
 */
export function useActionForm(action: (formData: FormData) => Promise<ActionState>) {
  const [state, setState] = useState<ActionState | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await action(formData);
      // Undefined when the action redirected.
      if (!result) return;
      setState(result);
      if (result.status === "error" && result.errors) {
        focusFirstInvalid(form, Object.keys(result.errors));
      }
    });
  }

  const errors = state?.status === "error" ? state.errors : undefined;
  return { state, pending, onSubmit, errors };
}
