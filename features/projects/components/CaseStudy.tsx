import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const rows = ["problem", "solution", "results"] as const;

export async function CaseStudy() {
  const t = await getTranslations("Projects.caseStudy");

  return (
    <Section className="border-y border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface)]">
      <Container>
        <article className="grid overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border-card)] bg-[color:var(--color-card)] shadow-[var(--shadow-md)] lg:grid-cols-2">
          {/* Swap for a next/image cover once a real case study exists */}
          <div className="grid min-h-80 place-items-center bg-[color:var(--color-surface-hover)] p-6 text-center text-sm text-[color:var(--color-text-subtle)]">
            {t("imagePlaceholder")}
          </div>
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[color:var(--color-brand-text)] rtl:text-sm rtl:normal-case rtl:tracking-normal">
              {t("eyebrow")}
            </p>
            <h2 className="font-display text-[clamp(1.625rem,2.6vw,2rem)] font-bold text-[color:var(--color-text-primary)] rtl:leading-[1.4]">
              {t("title")}
            </h2>
            <dl className="mt-6 grid gap-4 text-[0.9375rem]">
              {rows.map((row) => (
                <div key={row}>
                  <dt className="font-semibold text-[color:var(--color-text-primary)]">
                    {t(`${row}Label`)}
                  </dt>
                  <dd className="mt-1 text-[color:var(--color-text-muted)]">{t(row)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>
      </Container>
    </Section>
  );
}
