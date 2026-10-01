import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { pick } from "@/lib/localized";
import { listProjects } from "../api";
import type { ProjectCategory } from "../types";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilter } from "./ProjectFilter";

export type ProjectGridProps = {
  category: ProjectCategory | null;
};

export async function ProjectGrid({ category }: ProjectGridProps) {
  const [t, locale, projects] = await Promise.all([
    getTranslations("Projects"),
    getLocale(),
    listProjects({ publishedOnly: true }),
  ]);
  const shown = category ? projects.filter((project) => project.category === category) : projects;

  return (
    <Section>
      <Container>
        <ProjectFilter active={category} />
        {shown.length === 0 ? (
          <p className="mt-10 text-[color:var(--color-text-muted)]">{t("empty")}</p>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((project) => (
              <li key={project.id}>
                <ProjectCard
                  category={t(`categories.${project.category}`)}
                  title={pick(project.title, locale)}
                  description={pick(project.description, locale)}
                  tags={project.tags}
                />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
