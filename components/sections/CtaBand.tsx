import { getTranslations } from "next-intl/server";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export async function CtaBand() {
  const t = await getTranslations("CtaBand");

  return (
    <Section aria-labelledby="cta-title" className="theme-dark">
      <Container className="flex flex-wrap items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h2
            id="cta-title"
            className="font-display text-[clamp(1.875rem,3.4vw,2.75rem)] font-extrabold leading-[1.15] tracking-[var(--tracking-display)] rtl:font-bold rtl:leading-[1.4] rtl:tracking-normal"
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-[color:var(--color-text-muted)]">{t("description")}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" size="lg" iconEnd={<ArrowIcon />}>
            {t("primaryCta")}
          </Button>
          <Button href="/contact" size="lg" variant="ghost">
            {t("secondaryCta")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
