import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { ContentStatus, editLinkClass } from "@/features/dashboard/components/ContentStatus";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Notice } from "@/features/dashboard/components/Notice";
import { Panel } from "@/features/dashboard/components/Panel";
import { EmptyState, Table, Td, Th } from "@/features/dashboard/components/Table";
import { listProducts } from "@/features/products/api";
import { StatusBadge } from "@/features/products/components/StatusBadge";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/localized";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dashboard/coming-soon">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.products" });
  return { title: t("title") };
}

export default async function ProductsAdminPage({ searchParams }: PageProps<"/[locale]/dashboard/coming-soon">) {
  const [{ notice }, t, tStatus, locale, products] = await Promise.all([
    searchParams,
    getTranslations("Dashboard"),
    getTranslations("ProductStatus"),
    getLocale(),
    listProducts(),
  ]);

  return (
    <>
      <DashboardHeader
        title={t("products.title")}
        description={t("products.description")}
        actions={<Button href="/dashboard/coming-soon/new">{t("products.new")}</Button>}
      />
      <Notice notice={notice} />
      <Panel flush>
        {products.length === 0 ? (
          <EmptyState>{t("common.empty")}</EmptyState>
        ) : (
          <Table caption={t("products.title")}>
            <thead>
              <tr>
                <Th>{t("products.name")}</Th>
                <Th>{t("products.status")}</Th>
                <Th>{t("products.progress")}</Th>
                <Th>{t("common.published")}</Th>
                <Th>
                  <span className="sr-only">{t("common.actions")}</span>
                </Th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <Td className="min-w-56 font-semibold">{pick(product.title, locale)}</Td>
                  <Td className="whitespace-nowrap">
                    <StatusBadge status={product.status} label={tStatus(product.status)} />
                  </Td>
                  <Td className="font-mono text-[color:var(--color-text-muted)]">{product.progress}%</Td>
                  <Td>
                    <ContentStatus published={product.published} featured={product.featured} />
                  </Td>
                  <Td className="text-end">
                    <Link href={`/dashboard/coming-soon/${product.id}`} className={editLinkClass}>
                      {t("common.edit")}
                      <span className="sr-only">: {pick(product.title, locale)}</span>
                    </Link>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Panel>
    </>
  );
}
