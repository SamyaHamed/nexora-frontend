"use client";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DeleteButton, LocalizedField, SubmitBar } from "@/features/dashboard/components/FormParts";
import { useActionForm } from "@/features/dashboard/useActionForm";
import { useValidationMessage } from "@/lib/use-validation-message";
import { removeProduct, saveProduct } from "../actions";
import { productStatuses, type Product } from "../types";

export function ProductForm({ product }: { product?: Product }) {
  const t = useTranslations("Dashboard");
  const tStatus = useTranslations("ProductStatus");
  const errorMessage = useValidationMessage();
  const id = product?.id ?? null;
  const { state, pending, onSubmit, errors } = useActionForm((formData) => saveProduct(id, formData));

  return (
    <div className="flex flex-col gap-6">
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="grid gap-5 sm:grid-cols-3">
          <Select
            name="status"
            label={t("products.status")}
            defaultValue={product?.status ?? productStatuses[0]}
            options={productStatuses.map((value) => ({ value, label: tStatus(value) }))}
            error={errorMessage(errors, "status")}
            required
          />
          <Input
            name="progress"
            type="number"
            inputMode="numeric"
            min={0}
            max={100}
            label={t("products.progress")}
            helperText={t("products.progressHint")}
            defaultValue={product?.progress ?? 0}
            error={errorMessage(errors, "progress")}
            required
          />
          <Input
            name="tags"
            dir="ltr"
            label={t("products.tags")}
            helperText={t("products.tagsHint")}
            defaultValue={product?.tags.join(", ")}
            error={errorMessage(errors, "tags")}
          />
        </div>
        <LocalizedField name="title" label={t("products.name")} defaultValue={product?.title} errors={errors} />
        <LocalizedField
          name="description"
          label={t("products.summary")}
          defaultValue={product?.description}
          errors={errors}
          multiline
        />
        <div className="flex flex-col gap-4">
          <Checkbox
            name="featured"
            label={t("common.featured")}
            helperText={t("products.featuredHint")}
            defaultChecked={product?.featured ?? false}
          />
          <Checkbox
            name="published"
            label={t("common.published")}
            helperText={t("products.publishedHint")}
            defaultChecked={product?.published ?? true}
          />
        </div>
        <SubmitBar state={state} pending={pending} label={product ? undefined : t("common.create")} />
      </form>
      {product ? <DeleteButton action={() => removeProduct(product.id)} /> : null}
    </div>
  );
}
