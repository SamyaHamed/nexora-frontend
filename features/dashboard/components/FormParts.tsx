"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { ActionState } from "@/lib/action-state";
import type { Localized } from "@/lib/localized";
import { useValidationMessage } from "@/lib/use-validation-message";
import type { FieldErrors } from "@/lib/validation";

/** Success / error line under a dashboard form. */
export function FormStatus({ state }: { state: ActionState | null }) {
  const t = useTranslations("Dashboard");
  if (!state) return null;

  if (state.status === "success") {
    return state.notice ? (
      <p role="status" className="text-sm font-medium text-[color:var(--color-success)]">
        {t(`notices.${state.notice}`)}
      </p>
    ) : null;
  }

  return (
    <p role="alert" className="text-sm font-medium text-[color:var(--color-danger)]">
      {t(`errors.${state.formError ?? "fixFields"}`)}
    </p>
  );
}

export function SubmitBar({
  state,
  pending,
  label,
}: {
  state: ActionState | null;
  pending: boolean;
  label?: string;
}) {
  const t = useTranslations("Dashboard.common");
  return (
    <div className="flex flex-wrap items-center gap-4 border-t border-[color:var(--color-border-subtle)] pt-5">
      <Button type="submit" loading={pending}>
        {pending ? t("saving") : (label ?? t("save"))}
      </Button>
      <FormStatus state={state} />
    </div>
  );
}

export type LocalizedFieldProps = {
  name: string;
  label: string;
  defaultValue?: Localized;
  errors?: FieldErrors;
  multiline?: boolean;
  rows?: number;
  helperText?: string;
  optional?: boolean;
};

/** The same field once per language, side by side on wide screens. */
export function LocalizedField({
  name,
  label,
  defaultValue,
  errors,
  multiline = false,
  rows = 3,
  helperText,
  optional = false,
}: LocalizedFieldProps) {
  const t = useTranslations("Dashboard.common");
  const errorMessage = useValidationMessage();
  const languages = [
    { locale: "en", dir: "ltr", language: t("english") },
    { locale: "ar", dir: "rtl", language: t("arabic") },
  ] as const;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {languages.map(({ locale, dir, language }) => {
        const props = {
          name: `${name}.${locale}`,
          label: t("localizedLabel", { field: label, language }),
          defaultValue: defaultValue?.[locale],
          error: errorMessage(errors, `${name}.${locale}`),
          helperText,
          dir,
          lang: locale,
          required: !optional,
        };
        return multiline ? (
          <Textarea key={locale} rows={rows} {...props} />
        ) : (
          <Input key={locale} {...props} />
        );
      })}
    </div>
  );
}

/** Two-step delete: the first click asks, the second deletes. */
export function DeleteButton({ action }: { action: () => Promise<ActionState> }) {
  const t = useTranslations("Dashboard");
  const [confirming, setConfirming] = useState(false);
  const [failed, setFailed] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!confirming) {
    return (
      <Button variant="ghost" onClick={() => setConfirming(true)}>
        {t("common.delete")}
      </Button>
    );
  }

  return (
    <div
      role="group"
      aria-label={t("common.deleteQuestion")}
      className="flex flex-wrap items-center gap-3 rounded-[var(--radius-md)] border border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger)]/5 p-3"
    >
      <p className="text-sm text-[color:var(--color-text-primary)]">{t("common.deleteQuestion")}</p>
      <Button
        loading={pending}
        className="bg-[color:var(--color-danger)] text-[color:var(--color-ink-0)] hover:bg-[color:var(--color-danger)] hover:opacity-90 hover:shadow-none"
        onClick={() =>
          startTransition(async () => {
            const result = await action();
            if (result?.status === "error") setFailed(true);
          })
        }
      >
        {t("common.confirmDelete")}
      </Button>
      <Button variant="ghost" onClick={() => setConfirming(false)} disabled={pending}>
        {t("common.cancel")}
      </Button>
      {failed ? (
        <p role="alert" className="w-full text-sm font-medium text-[color:var(--color-danger)]">
          {t("errors.generic")}
        </p>
      ) : null}
    </div>
  );
}
