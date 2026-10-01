import { getLocale, getTranslations } from "next-intl/server";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listProjects } from "@/features/projects/api";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { pick } from "@/lib/localized";

const MAX_FEATURED = 3;

export async function FeaturedProjectsSection() {
  const [t, tProjects, locale, projects] = await Promise.all([
    getTranslations("Home.projects"),
    getTranslations("Projects"),
    getLocale(),
    listProjects({ publishedOnly: true }),
  ]);
  const featured = projects.filter((project) => project.featured).slice(0, MAX_FEATURED);
  if (featured.length === 0) return null;

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
          {featured.map((project) => (
            <li key={project.id}>
              <ProjectCard
                category={tProjects(`categories.${project.category}`)}
                title={pick(project.title, locale)}
                description={pick(project.description, locale)}
                tags={project.tags}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
