import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Panel } from "@/features/dashboard/components/Panel";
import { getSettings } from "@/features/settings/api";
import { SettingsForm } from "@/features/settings/components/SettingsForm";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dashboard/settings">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.settings" });
  return { title: t("title") };
}

export default async function SettingsPage() {
  const [t, settings] = await Promise.all([getTranslations("Dashboard.settings"), getSettings()]);

  return (
    <>
      <DashboardHeader title={t("title")} description={t("description")} />
      <Panel>
        <SettingsForm settings={settings} />
      </Panel>
    </>
  );
}
