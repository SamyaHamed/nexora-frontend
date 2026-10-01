import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listServices } from "@/features/services/api";
import { ServiceCard } from "@/features/services/components/ServiceCard";
import { pick } from "@/lib/localized";

export async function ServicesSection() {
  const [t, locale, services] = await Promise.all([
    getTranslations("Home.services"),
    getLocale(),
    listServices({ publishedOnly: true }),
  ]);

  return (
    <Section className="border-y border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface)]">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          align="center"
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.id}>
              <ServiceCard
                icon={service.icon}
                title={pick(service.title, locale)}
                description={pick(service.description, locale)}
                href={`/services#${service.id}`}
                linkLabel={t("learnMore")}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
