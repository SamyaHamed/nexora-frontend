"use client";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DeleteButton, LocalizedField, SubmitBar } from "@/features/dashboard/components/FormParts";
import { useActionForm } from "@/features/dashboard/useActionForm";
import { useValidationMessage } from "@/lib/use-validation-message";
import { removeService, saveService } from "../actions";
import { serviceIcons, type Service } from "../types";

export type ServiceFormProps = {
  /** Omit to create a new service. */
  service?: Service;
  nextOrder?: number;
};

export function ServiceForm({ service, nextOrder = 1 }: ServiceFormProps) {
  const t = useTranslations("Dashboard");
  const errorMessage = useValidationMessage();
  const id = service?.id ?? null;
  const { state, pending, onSubmit, errors } = useActionForm((formData) => saveService(id, formData));

  return (
    <div className="flex flex-col gap-6">
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <Select
            name="icon"
            label={t("services.icon")}
            defaultValue={service?.icon ?? serviceIcons[0]}
            options={serviceIcons.map((icon) => ({ value: icon, label: t(`services.icons.${icon}`) }))}
            error={errorMessage(errors, "icon")}
            required
          />
          <Input
            name="order"
            type="number"
            inputMode="numeric"
            min={1}
            max={999}
            label={t("services.order")}
            defaultValue={service?.order ?? nextOrder}
            error={errorMessage(errors, "order")}
            required
          />
        </div>
        <LocalizedField name="title" label={t("services.name")} defaultValue={service?.title} errors={errors} />
        <LocalizedField
          name="description"
          label={t("services.summary")}
          defaultValue={service?.description}
          errors={errors}
          multiline
        />
        <LocalizedField
          name="features"
          label={t("services.features")}
          helperText={t("services.featuresHint")}
          defaultValue={
            service ? { en: service.features.en.join("\n"), ar: service.features.ar.join("\n") } : undefined
          }
          errors={errors}
          multiline
          rows={4}
          optional
        />
        <Checkbox
          name="published"
          label={t("common.published")}
          helperText={t("services.publishedHint")}
          defaultChecked={service?.published ?? true}
        />
        <SubmitBar state={state} pending={pending} label={service ? undefined : t("common.create")} />
      </form>
      {service ? <DeleteButton action={() => removeService(service.id)} /> : null}
    </div>
  );
}
