import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/features/services/components/ServiceCard";
import { services } from "@/features/services/data";

export async function ServicesSection() {
  const [t, tServices] = await Promise.all([
    getTranslations("Home.services"),
    getTranslations("Services.items"),
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
            <li key={service.key}>
              <ServiceCard
                icon={service.icon}
                title={tServices(`${service.key}.title`)}
                description={tServices(`${service.key}.description`)}
                href={`/services#${service.key}`}
                linkLabel={t("learnMore")}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
