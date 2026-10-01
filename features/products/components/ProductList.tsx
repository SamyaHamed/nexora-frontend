import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { products } from "../data";
import { productStatuses } from "../types";
import { ProductRow } from "./ProductRow";
import { StatusBadge } from "./StatusBadge";

export async function ProductList() {
  const [t, tStatus] = await Promise.all([
    getTranslations("Products"),
    getTranslations("ProductStatus"),
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
            const title = t(`items.${product.key}.title`);
            return (
              <li key={product.key}>
                <ProductRow
                  title={title}
                  description={t(`items.${product.key}.description`)}
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
