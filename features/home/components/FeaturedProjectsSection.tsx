import { getTranslations } from "next-intl/server";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { projects } from "@/features/projects/data";

export async function FeaturedProjectsSection() {
  const [t, tProjects] = await Promise.all([
    getTranslations("Home.projects"),
    getTranslations("Projects"),
  ]);
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <Section>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
          <Button href="/projects" variant="ghost" iconEnd={<ArrowIcon />}>
            {t("viewAll")}
          </Button>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <li key={project.key}>
              <ProjectCard
                category={tProjects(`categories.${project.category}`)}
                title={tProjects(`items.${project.key}.title`)}
                description={tProjects(`items.${project.key}.description`)}
                tags={project.tags}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
