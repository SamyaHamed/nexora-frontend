import { getTranslations } from "next-intl/server";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { Link } from "@/i18n/navigation";
import { products } from "@/features/products/data";

export async function ComingSoonSection() {
  const [t, tProducts, tStatus] = await Promise.all([
    getTranslations("Home.comingSoon"),
    getTranslations("Products"),
    getTranslations("ProductStatus"),
  ]);
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <Section className="border-y border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface)]">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {featuredProducts.map((product) => (
            <li key={product.key}>
              <ProjectCard
                category={tProducts("category")}
                title={tProducts(`items.${product.key}.title`)}
                description={tProducts(`items.${product.key}.description`)}
                tags={product.tags}
                status={product.status}
                statusLabel={tStatus(product.status)}
              />
            </li>
          ))}
        </ul>
        <Link
          href="/coming-soon"
          className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-sm)] text-[0.9375rem] font-semibold text-[color:var(--color-brand-text)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]"
        >
          {t("seeAll")}
          <ArrowIcon />
        </Link>
      </Container>
    </Section>
  );
}
