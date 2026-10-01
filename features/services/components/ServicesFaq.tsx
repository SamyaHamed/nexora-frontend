import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const questions = ["duration", "cost", "support", "existing"] as const;

export async function ServicesFaq() {
  const t = await getTranslations("Services.faq");

  return (
    <Section className="border-y border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface)]">
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
          <Button href="/contact" variant="secondary" className="mt-7">
            {t("cta")}
          </Button>
        </div>
        {/* Native <details>: keyboard and screen-reader support without client JS */}
        <div>
          {questions.map((key) => (
            <details
              key={key}
              className="group border-b border-[color:var(--color-border-subtle)] py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[var(--radius-sm)] font-display text-lg font-semibold text-[color:var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-focus-outline)] [&::-webkit-details-marker]:hidden">
                {t(`items.${key}.question`)}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="size-5 shrink-0 text-[color:var(--color-text-muted)] transition-transform duration-[var(--duration-fast)] group-open:rotate-180"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p className="mt-3 text-[color:var(--color-text-muted)]">{t(`items.${key}.answer`)}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
