import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const values = ["practical", "communication", "lasting", "partners"] as const;

export async function Values() {
  const t = await getTranslations("About.values");

  return (
    <Section>
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((key) => (
            <li key={key}>
              <span
                aria-hidden="true"
                className="block h-1 w-10 rounded-full bg-[color:var(--color-brand)]"
              />
              <h3 className="mt-5 text-xl font-semibold text-[color:var(--color-text-primary)]">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 text-[0.9375rem] text-[color:var(--color-text-muted)]">
                {t(`items.${key}.description`)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
