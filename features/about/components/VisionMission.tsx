import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const statements = ["vision", "mission"] as const;

export async function VisionMission() {
  const t = await getTranslations("About");

  return (
    <Section className="border-y border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface)]">
      <Container>
        <ul className="grid gap-6 md:grid-cols-2">
          {statements.map((key) => (
            <li key={key}>
              <Card className="h-full">
                <h2 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[color:var(--color-brand-text)] rtl:text-sm rtl:tracking-normal">
                  {t(`${key}.label`)}
                </h2>
                <p className="font-display text-2xl font-bold leading-[1.3] tracking-[var(--tracking-heading)] text-[color:var(--color-text-primary)] rtl:leading-[1.5] rtl:tracking-normal">
                  {t(`${key}.text`)}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
