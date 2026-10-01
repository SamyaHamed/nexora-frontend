import type { FieldErrors } from "./validation";

/**
 * What a dashboard Server Action returns to its form.
 * `notice` / `formError` are message keys under "Dashboard.notices" /
 * "Dashboard.errors"; field errors map to "Validation".
 */
export type ActionState =
  | { status: "success"; notice?: string }
  | { status: "error"; errors?: FieldErrors; formError?: string };

export const invalid = (errors: FieldErrors): ActionState => ({ status: "error", errors });

export const failed = (formError = "generic"): ActionState => ({ status: "error", formError });
