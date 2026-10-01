"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { submitContactMessage } from "../api";
import { validateContactMessage } from "../schema";
import { useFormSubmission } from "../useFormSubmission";
import { HoneypotField, SubmitError, SubmitSuccess, useErrorMessage } from "./FormParts";

export function ContactMessageForm() {
  const t = useTranslations("Contact");
  const errorMessage = useErrorMessage();
  const { status, errors, handleSubmit, reset } = useFormSubmission(
    validateContactMessage,
    submitContactMessage,
  );

  if (status === "success") return <SubmitSuccess onReset={reset} />;

  const submitting = status === "submitting";

  return (
    <form noValidate onSubmit={handleSubmit} className="relative mt-7 flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          name="name"
          autoComplete="name"
          label={t("fields.name")}
          placeholder={t("fields.namePlaceholder")}
          error={errorMessage(errors.name)}
          required
        />
        <Input
          name="email"
          type="email"
          autoComplete="email"
          dir="ltr"
          label={t("fields.email")}
          placeholder={t("fields.emailPlaceholder")}
          error={errorMessage(errors.email)}
          required
        />
      </div>
      <Input
        name="subject"
        label={t("fields.subject")}
        placeholder={t("fields.subjectPlaceholder")}
        error={errorMessage(errors.subject)}
        required
      />
      <Textarea
        name="message"
        rows={6}
        label={t("fields.message")}
        error={errorMessage(errors.message)}
        required
      />
      <HoneypotField />
      {status === "error" ? <SubmitError /> : null}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-[0.8125rem] text-[color:var(--color-text-muted)]">{t("replyTime")}</p>
        <Button type="submit" size="lg" loading={submitting}>
          {submitting ? t("submitting") : t("submitMessage")}
        </Button>
      </div>
    </form>
  );
}
