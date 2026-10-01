"use client";

import { useTranslations } from "next-intl";
import { Select } from "@/components/ui/Select";
import { SubmitBar } from "@/features/dashboard/components/FormParts";
import { useActionForm } from "@/features/dashboard/useActionForm";
import { useValidationMessage } from "@/lib/use-validation-message";
import { changeRequestStatus } from "../actions";
import { requestStatuses, type RequestStatus } from "../types";

export function RequestStatusForm({ id, status }: { id: string; status: RequestStatus }) {
  const t = useTranslations("Dashboard.requests");
  const errorMessage = useValidationMessage();
  const { state, pending, onSubmit, errors } = useActionForm((formData) =>
    changeRequestStatus(id, formData),
  );

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
      <Select
        name="status"
        label={t("status")}
        defaultValue={status}
        options={requestStatuses.map((value) => ({ value, label: t(`statuses.${value}`) }))}
        error={errorMessage(errors, "status")}
      />
      <SubmitBar state={state} pending={pending} label={t("updateStatus")} />
    </form>
  );
}
