import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { CaseStudy } from "@/features/projects/components/CaseStudy";
import { ProjectGrid } from "@/features/projects/components/ProjectGrid";
import { isProjectCategory } from "@/features/projects/types";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Projects" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ProjectsPage({ searchParams }: PageProps<"/[locale]/projects">) {
  const [{ category }, t] = await Promise.all([
    searchParams,
    getTranslations("Projects.header"),
  ]);

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      {/* Unknown or repeated ?category values fall back to "All" */}
      <ProjectGrid category={isProjectCategory(category) ? category : null} />
      <CaseStudy />
      <CtaBand />
    </>
  );
}
