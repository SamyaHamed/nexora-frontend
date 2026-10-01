import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { projects } from "../data";
import type { ProjectCategory } from "../types";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilter } from "./ProjectFilter";

export type ProjectGridProps = {
  category: ProjectCategory | null;
};

export async function ProjectGrid({ category }: ProjectGridProps) {
  const t = await getTranslations("Projects");
  const shown = category ? projects.filter((project) => project.category === category) : projects;

  return (
    <Section>
      <Container>
        <ProjectFilter active={category} />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project) => (
            <li key={project.key}>
              <ProjectCard
                category={t(`categories.${project.category}`)}
                title={t(`items.${project.key}.title`)}
                description={t(`items.${project.key}.description`)}
                tags={project.tags}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
