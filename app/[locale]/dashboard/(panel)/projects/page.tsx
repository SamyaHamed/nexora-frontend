import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { ContentStatus, editLinkClass } from "@/features/dashboard/components/ContentStatus";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Notice } from "@/features/dashboard/components/Notice";
import { Panel } from "@/features/dashboard/components/Panel";
import { EmptyState, Table, Td, Th } from "@/features/dashboard/components/Table";
import { listProjects } from "@/features/projects/api";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/localized";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dashboard/projects">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.projects" });
  return { title: t("title") };
}

export default async function ProjectsAdminPage({ searchParams }: PageProps<"/[locale]/dashboard/projects">) {
  const [{ notice }, t, tCategories, locale, projects] = await Promise.all([
    searchParams,
    getTranslations("Dashboard"),
    getTranslations("Projects.categories"),
    getLocale(),
    listProjects(),
  ]);

  return (
    <>
      <DashboardHeader
        title={t("projects.title")}
        description={t("projects.description")}
        actions={<Button href="/dashboard/projects/new">{t("projects.new")}</Button>}
      />
      <Notice notice={notice} />
      <Panel flush>
        {projects.length === 0 ? (
          <EmptyState>{t("common.empty")}</EmptyState>
        ) : (
          <Table caption={t("projects.title")}>
            <thead>
              <tr>
                <Th>{t("projects.name")}</Th>
                <Th>{t("projects.category")}</Th>
                <Th>{t("projects.tags")}</Th>
                <Th>{t("common.published")}</Th>
                <Th>
                  <span className="sr-only">{t("common.actions")}</span>
                </Th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <Td className="min-w-56 font-semibold">{pick(project.title, locale)}</Td>
                  <Td className="whitespace-nowrap">{tCategories(project.category)}</Td>
                  <Td className="min-w-48 font-mono text-xs text-[color:var(--color-text-muted)]">
                    {project.tags.join(", ")}
                  </Td>
                  <Td>
                    <ContentStatus published={project.published} featured={project.featured} />
                  </Td>
                  <Td className="text-end">
                    <Link href={`/dashboard/projects/${project.id}`} className={editLinkClass}>
                      {t("common.edit")}
                      <span className="sr-only">: {pick(project.title, locale)}</span>
                    </Link>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Panel>
    </>
  );
}
