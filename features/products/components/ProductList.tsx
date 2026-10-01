import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { pick } from "@/lib/localized";
import { listProducts } from "../api";
import { productStatuses } from "../types";
import { ProductRow } from "./ProductRow";
import { StatusBadge } from "./StatusBadge";

export async function ProductList() {
  const [t, tStatus, locale, products] = await Promise.all([
    getTranslations("Products"),
    getTranslations("ProductStatus"),
    getLocale(),
    listProducts({ publishedOnly: true }),
  ]);

  return (
    <Section>
      <Container>
        {/* Legend of what each status means */}
        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-[color:var(--color-text-muted)]">
          <span>{t("statusLegend")}</span>
          <ul className="flex flex-wrap gap-3">
            {productStatuses.map((status) => (
              <li key={status}>
                <StatusBadge status={status} label={tStatus(status)} />
              </li>
            ))}
          </ul>
        </div>
        <ul className="flex flex-col gap-4">
          {products.map((product) => {
            const title = pick(product.title, locale);
            return (
              <li key={product.id}>
                <ProductRow
                  title={title}
                  description={pick(product.description, locale)}
                  status={product.status}
                  statusLabel={tStatus(product.status)}
                  progress={product.progress}
                  progressLabel={t("progressLabel", { name: title })}
                  tags={product.tags}
                />
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
