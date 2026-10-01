"use client";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DeleteButton, LocalizedField, SubmitBar } from "@/features/dashboard/components/FormParts";
import { useActionForm } from "@/features/dashboard/useActionForm";
import { useValidationMessage } from "@/lib/use-validation-message";
import { removeProject, saveProject } from "../actions";
import { projectCategories, type Project } from "../types";

export function ProjectForm({ project }: { project?: Project }) {
  const t = useTranslations("Dashboard");
  const tCategories = useTranslations("Projects.categories");
  const errorMessage = useValidationMessage();
  const id = project?.id ?? null;
  const { state, pending, onSubmit, errors } = useActionForm((formData) => saveProject(id, formData));

  return (
    <div className="flex flex-col gap-6">
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <Select
            name="category"
            label={t("projects.category")}
            defaultValue={project?.category ?? projectCategories[0]}
            options={projectCategories.map((value) => ({ value, label: tCategories(value) }))}
            error={errorMessage(errors, "category")}
            required
          />
          <Input
            name="tags"
            dir="ltr"
            label={t("projects.tags")}
            helperText={t("projects.tagsHint")}
            defaultValue={project?.tags.join(", ")}
            error={errorMessage(errors, "tags")}
          />
        </div>
        <LocalizedField name="title" label={t("projects.name")} defaultValue={project?.title} errors={errors} />
        <LocalizedField
          name="description"
          label={t("projects.summary")}
          defaultValue={project?.description}
          errors={errors}
          multiline
        />
        <div className="flex flex-col gap-4">
          <Checkbox
            name="featured"
            label={t("common.featured")}
            helperText={t("projects.featuredHint")}
            defaultChecked={project?.featured ?? false}
          />
          <Checkbox
            name="published"
            label={t("common.published")}
            helperText={t("projects.publishedHint")}
            defaultChecked={project?.published ?? true}
          />
        </div>
        <SubmitBar state={state} pending={pending} label={project ? undefined : t("common.create")} />
      </form>
      {project ? <DeleteButton action={() => removeProject(project.id)} /> : null}
    </div>
  );
}
