import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Notice } from "@/features/dashboard/components/Notice";
import { Panel } from "@/features/dashboard/components/Panel";
import { getProduct } from "@/features/products/api";
import { ProductForm } from "@/features/products/components/ProductForm";
import { pick } from "@/lib/localized";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dashboard/coming-soon/[id]">): Promise<Metadata> {
  const { id, locale } = await params;
  const product = await getProduct(id);
  return { title: product ? pick(product.title, locale) : undefined };
}

export default async function EditProductPage({
  params,
  searchParams,
}: PageProps<"/[locale]/dashboard/coming-soon/[id]">) {
  const [{ id }, { notice }] = await Promise.all([params, searchParams]);
  const [t, locale, product] = await Promise.all([
    getTranslations("Dashboard.products"),
    getLocale(),
    getProduct(id),
  ]);
  if (!product) notFound();

  return (
    <>
      <DashboardHeader
        title={pick(product.title, locale)}
        description={t("editTitle")}
        back={{ href: "/dashboard/coming-soon", label: t("title") }}
      />
      <Notice notice={notice} />
      <Panel>
        <ProductForm product={product} />
      </Panel>
    </>
  );
}
