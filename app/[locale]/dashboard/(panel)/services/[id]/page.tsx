import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Notice } from "@/features/dashboard/components/Notice";
import { Panel } from "@/features/dashboard/components/Panel";
import { getService } from "@/features/services/api";
import { ServiceForm } from "@/features/services/components/ServiceForm";
import { pick } from "@/lib/localized";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dashboard/services/[id]">): Promise<Metadata> {
  const { id, locale } = await params;
  const service = await getService(id);
  return { title: service ? pick(service.title, locale) : undefined };
}

export default async function EditServicePage({
  params,
  searchParams,
}: PageProps<"/[locale]/dashboard/services/[id]">) {
  const [{ id }, { notice }] = await Promise.all([params, searchParams]);
  const [t, locale, service] = await Promise.all([
    getTranslations("Dashboard.services"),
    getLocale(),
    getService(id),
  ]);
  if (!service) notFound();

  return (
    <>
      <DashboardHeader
        title={pick(service.title, locale)}
        description={t("editTitle")}
        back={{ href: "/dashboard/services", label: t("title") }}
      />
      <Notice notice={notice} />
      <Panel>
        <ServiceForm service={service} />
      </Panel>
    </>
  );
}
