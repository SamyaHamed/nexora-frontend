import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Panel } from "@/features/dashboard/components/Panel";
import { listServices } from "@/features/services/api";
import { ServiceForm } from "@/features/services/components/ServiceForm";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dashboard/services/new">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.services" });
  return { title: t("newTitle") };
}

export default async function NewServicePage() {
  const [t, services] = await Promise.all([getTranslations("Dashboard.services"), listServices()]);
  const nextOrder = Math.max(0, ...services.map((service) => service.order)) + 1;

  return (
    <>
      <DashboardHeader title={t("newTitle")} back={{ href: "/dashboard/services", label: t("title") }} />
      <Panel>
        <ServiceForm nextOrder={nextOrder} />
      </Panel>
    </>
  );
}
