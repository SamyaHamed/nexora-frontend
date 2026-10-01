import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProductList } from "@/features/products/components/ProductList";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/coming-soon">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Products" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ComingSoonPage() {
  const t = await getTranslations("Products.header");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <ProductList />
      <CtaBand />
    </>
  );
}
