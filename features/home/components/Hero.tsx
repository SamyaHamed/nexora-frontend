import { getTranslations } from "next-intl/server";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "./HeroVisual";

export async function Hero() {
  const t = await getTranslations("Home.hero");

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-40 -top-50 size-160 rounded-full bg-[image:var(--gradient-hero-glow)]"
      />
      <Container className="relative grid items-center gap-14 py-18 sm:py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[color:var(--color-brand-text)] rtl:text-sm rtl:normal-case rtl:tracking-normal">
            {t("eyebrow")}
          </p>
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.5rem,5.2vw,4rem)] font-extrabold leading-[1.08] tracking-[var(--tracking-display)] text-[color:var(--color-text-primary)] rtl:font-bold rtl:leading-[1.3] rtl:tracking-normal"
          >
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[color:var(--color-text-muted)]">
            {t("description")}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/contact" size="lg" iconEnd={<ArrowIcon />}>
              {t("primaryCta")}
            </Button>
            <Button href="/projects" size="lg" variant="ghost">
              {t("secondaryCta")}
            </Button>
          </div>
        </div>
        <HeroVisual />
      </Container>
    </section>
  );
}
