import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Panel } from "@/features/dashboard/components/Panel";
import { ProductForm } from "@/features/products/components/ProductForm";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dashboard/coming-soon/new">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.products" });
  return { title: t("newTitle") };
}

export default async function NewProductPage() {
  const t = await getTranslations("Dashboard.products");

  return (
    <>
      <DashboardHeader title={t("newTitle")} back={{ href: "/dashboard/coming-soon", label: t("title") }} />
      <Panel>
        <ProductForm />
      </Panel>
    </>
  );
}
