import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function WhoWeAre() {
  const t = await getTranslations("About.whoWeAre");

  return (
    <Section>
      <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="flex flex-col gap-4 text-[1.0625rem] leading-[1.7] text-[color:var(--color-text-muted)]">
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
        </div>
      </Container>
    </Section>
  );
}
