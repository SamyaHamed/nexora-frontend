import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactInfo } from "@/features/contact/components/ContactInfo";
import { ContactTabs } from "@/features/contact/components/ContactTabs";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("Contact.header");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <Section>
        <Container className="grid items-start gap-14 lg:grid-cols-[2fr_3fr]">
          <ContactInfo />
          <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-border-card)] bg-[color:var(--color-card)] p-6 shadow-[var(--shadow-lg)] sm:p-10">
            <ContactTabs />
          </div>
        </Container>
      </Section>
    </>
  );
}
