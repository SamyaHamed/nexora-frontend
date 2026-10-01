import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "../data";

export async function ProcessSection() {
  const t = await getTranslations("Home.process");

  return (
    <Section>
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step} className="border-t-2 border-[color:var(--color-border-subtle)] pt-6">
              <span className="font-mono text-sm font-medium text-[color:var(--color-brand-text)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-[color:var(--color-text-primary)]">
                {t(`steps.${step}.title`)}
              </h3>
              <p className="mt-2 text-[0.9375rem] text-[color:var(--color-text-muted)]">
                {t(`steps.${step}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
