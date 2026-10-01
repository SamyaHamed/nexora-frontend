import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Panel } from "@/features/dashboard/components/Panel";
import { ProjectForm } from "@/features/projects/components/ProjectForm";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dashboard/projects/new">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.projects" });
  return { title: t("newTitle") };
}

export default async function NewProjectPage() {
  const t = await getTranslations("Dashboard.projects");

  return (
    <>
      <DashboardHeader title={t("newTitle")} back={{ href: "/dashboard/projects", label: t("title") }} />
      <Panel>
        <ProjectForm />
      </Panel>
    </>
  );
}
