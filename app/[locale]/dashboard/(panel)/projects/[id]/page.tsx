import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Notice } from "@/features/dashboard/components/Notice";
import { Panel } from "@/features/dashboard/components/Panel";
import { getProject } from "@/features/projects/api";
import { ProjectForm } from "@/features/projects/components/ProjectForm";
import { pick } from "@/lib/localized";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dashboard/projects/[id]">): Promise<Metadata> {
  const { id, locale } = await params;
  const project = await getProject(id);
  return { title: project ? pick(project.title, locale) : undefined };
}

export default async function EditProjectPage({
  params,
  searchParams,
}: PageProps<"/[locale]/dashboard/projects/[id]">) {
  const [{ id }, { notice }] = await Promise.all([params, searchParams]);
  const [t, locale, project] = await Promise.all([
    getTranslations("Dashboard.projects"),
    getLocale(),
    getProject(id),
  ]);
  if (!project) notFound();

  return (
    <>
      <DashboardHeader
        title={pick(project.title, locale)}
        description={t("editTitle")}
        back={{ href: "/dashboard/projects", label: t("title") }}
      />
      <Notice notice={notice} />
      <Panel>
        <ProjectForm project={project} />
      </Panel>
    </>
  );
}
