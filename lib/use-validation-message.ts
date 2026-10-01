import { useTranslations } from "next-intl";
import type { FieldErrors, ValidationError } from "./validation";

/** Client forms: turns a field's validation error into its localized message. */
export function useValidationMessage() {
  const t = useTranslations("Validation");
  return (errors: FieldErrors | undefined, field: string): string | undefined => {
    const error: ValidationError | undefined = errors?.[field];
    return error ? t(error.code, { limit: error.limit ?? 0 }) : undefined;
  };
}
