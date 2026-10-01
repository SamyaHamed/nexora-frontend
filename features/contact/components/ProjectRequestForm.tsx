"use client";

import { useTranslations } from "next-intl";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { useValidationMessage } from "@/lib/use-validation-message";
import { submitProjectRequest } from "../api";
import { validateProjectRequest } from "../schema";
import { budgets, projectTypes, timelines } from "../types";
import { useFormSubmission } from "../useFormSubmission";
import { HoneypotField, SubmitError, SubmitSuccess } from "./FormParts";

export function ProjectRequestForm() {
  const t = useTranslations("Contact");
  const errorMessage = useValidationMessage();
  const { status, errors, handleSubmit, reset } = useFormSubmission(
    validateProjectRequest,
    submitProjectRequest,
  );

  if (status === "success") return <SubmitSuccess onReset={reset} />;

  const submitting = status === "submitting";

  return (
    <form noValidate onSubmit={handleSubmit} className="relative mt-7 flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          name="projectType"
          label={t("fields.projectType")}
          placeholder={t("fields.selectPlaceholder")}
          options={projectTypes.map((value) => ({ value, label: t(`options.projectType.${value}`) }))}
          error={errorMessage(errors, "projectType")}
          required
        />
        <Select
          name="budget"
          label={t("fields.budget")}
          placeholder={t("fields.selectPlaceholder")}
          options={budgets.map((value) => ({ value, label: t(`options.budget.${value}`) }))}
          error={errorMessage(errors, "budget")}
          required
        />
      </div>
      <Select
        name="timeline"
        label={t("fields.timeline")}
        placeholder={t("fields.selectPlaceholder")}
        options={timelines.map((value) => ({ value, label: t(`options.timeline.${value}`) }))}
        error={errorMessage(errors, "timeline")}
        required
      />
      <Textarea
        name="description"
        rows={5}
        label={t("fields.description")}
        placeholder={t("fields.descriptionPlaceholder")}
        helperText={t("fields.descriptionHint")}
        error={errorMessage(errors, "description")}
        required
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          name="name"
          autoComplete="name"
          label={t("fields.name")}
          placeholder={t("fields.namePlaceholder")}
          error={errorMessage(errors, "name")}
          required
        />
        <Input
          name="email"
          type="email"
          autoComplete="email"
          dir="ltr"
          label={t("fields.email")}
          placeholder={t("fields.emailPlaceholder")}
          error={errorMessage(errors, "email")}
          required
        />
      </div>
      <HoneypotField />
      {status === "error" ? <SubmitError /> : null}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-[0.8125rem] text-[color:var(--color-text-muted)]">{t("replyTime")}</p>
        <Button type="submit" size="lg" loading={submitting} iconEnd={<ArrowIcon />}>
          {submitting ? t("submitting") : t("submitProject")}
        </Button>
      </div>
    </form>
  );
}
