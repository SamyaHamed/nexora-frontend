import { getLocale, getTranslations } from "next-intl/server";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listProducts } from "@/features/products/api";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/localized";

const MAX_FEATURED = 2;

export async function ComingSoonSection() {
  const [t, tProducts, tStatus, locale, products] = await Promise.all([
    getTranslations("Home.comingSoon"),
    getTranslations("Products"),
    getTranslations("ProductStatus"),
    getLocale(),
    listProducts({ publishedOnly: true }),
  ]);
  const featured = products.filter((product) => product.featured).slice(0, MAX_FEATURED);
  if (featured.length === 0) return null;

  return (
    <Section className="border-y border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface)]">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {featured.map((product) => (
            <li key={product.id}>
              <ProjectCard
                category={tProducts("category")}
                title={pick(product.title, locale)}
                description={pick(product.description, locale)}
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
