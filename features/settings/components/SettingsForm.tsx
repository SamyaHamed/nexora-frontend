"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import { socialKeys } from "@/config/site";
import { LocalizedField, SubmitBar } from "@/features/dashboard/components/FormParts";
import { useActionForm } from "@/features/dashboard/useActionForm";
import { useValidationMessage } from "@/lib/use-validation-message";
import { saveSettings } from "../actions";
import type { SiteSettings } from "../types";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const t = useTranslations("Dashboard.settings");
  const tSocial = useTranslations("Social");
  const errorMessage = useValidationMessage();
  const { state, pending, onSubmit, errors } = useActionForm(saveSettings);

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-8">
      <fieldset className="flex flex-col gap-5">
        <legend className="mb-4 font-display text-lg font-semibold">{t("contactSection")}</legend>
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            name="email"
            type="email"
            dir="ltr"
            label={t("email")}
            defaultValue={settings.email}
            error={errorMessage(errors, "email")}
            required
          />
          <Input
            name="phone"
            type="tel"
            dir="ltr"
            label={t("phone")}
            defaultValue={settings.phone}
            error={errorMessage(errors, "phone")}
            required
          />
        </div>
        <LocalizedField name="address" label={t("address")} defaultValue={settings.address} errors={errors} />
        <LocalizedField
          name="workingHours"
          label={t("workingHours")}
          defaultValue={settings.workingHours}
          errors={errors}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="mb-4 font-display text-lg font-semibold">{t("socialSection")}</legend>
        <div className="grid gap-5 md:grid-cols-3">
          {socialKeys.map((key) => (
            <Input
              key={key}
              name={`social.${key}`}
              type="url"
              dir="ltr"
              label={tSocial(key)}
              defaultValue={settings.social[key]}
              error={errorMessage(errors, `social.${key}`)}
              required
            />
          ))}
        </div>
      </fieldset>

      <SubmitBar state={state} pending={pending} />
    </form>
  );
}
