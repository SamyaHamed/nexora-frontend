"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FormStatus } from "@/features/dashboard/components/FormParts";
import { useActionForm } from "@/features/dashboard/useActionForm";
import { useValidationMessage } from "@/lib/use-validation-message";
import { login } from "../actions";

export function LoginForm() {
  const t = useTranslations("Dashboard.login");
  const errorMessage = useValidationMessage();
  const { state, pending, onSubmit, errors } = useActionForm(login);

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
      <Input
        name="email"
        type="email"
        autoComplete="username"
        dir="ltr"
        label={t("email")}
        error={errorMessage(errors, "email")}
        required
      />
      <Input
        name="password"
        type="password"
        autoComplete="current-password"
        dir="ltr"
        label={t("password")}
        error={errorMessage(errors, "password")}
        required
      />
      <FormStatus state={state} />
      <Button type="submit" size="lg" loading={pending} className="w-full">
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
