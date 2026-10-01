import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { ContentStatus, editLinkClass } from "@/features/dashboard/components/ContentStatus";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Notice } from "@/features/dashboard/components/Notice";
import { Panel } from "@/features/dashboard/components/Panel";
import { EmptyState, Table, Td, Th } from "@/features/dashboard/components/Table";
import { listServices } from "@/features/services/api";
import { ServiceIcon } from "@/features/services/components/ServiceIcon";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/localized";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dashboard/services">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.services" });
  return { title: t("title") };
}

export default async function ServicesAdminPage({ searchParams }: PageProps<"/[locale]/dashboard/services">) {
  const [{ notice }, t, locale, services] = await Promise.all([
    searchParams,
    getTranslations("Dashboard"),
    getLocale(),
    listServices(),
  ]);

  return (
    <>
      <DashboardHeader
        title={t("services.title")}
        description={t("services.description")}
        actions={<Button href="/dashboard/services/new">{t("services.new")}</Button>}
      />
      <Notice notice={notice} />
      <Panel flush>
        {services.length === 0 ? (
          <EmptyState>{t("common.empty")}</EmptyState>
        ) : (
          <Table caption={t("services.title")}>
            <thead>
              <tr>
                <Th>{t("services.order")}</Th>
                <Th>{t("services.name")}</Th>
                <Th>{t("services.features")}</Th>
                <Th>{t("common.published")}</Th>
                <Th>
                  <span className="sr-only">{t("common.actions")}</span>
                </Th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <Td className="font-mono text-[color:var(--color-text-muted)]">{service.order}</Td>
                  <Td className="min-w-64">
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="grid size-9 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand-text)]"
                      >
                        <ServiceIcon name={service.icon} className="size-5" />
                      </span>
                      <span className="font-semibold">{pick(service.title, locale)}</span>
                    </span>
                  </Td>
                  <Td className="text-[color:var(--color-text-muted)]">{pick(service.features, locale).length}</Td>
                  <Td>
                    <ContentStatus published={service.published} />
                  </Td>
                  <Td className="text-end">
                    <Link href={`/dashboard/services/${service.id}`} className={editLinkClass}>
                      {t("common.edit")}
                      <span className="sr-only">: {pick(service.title, locale)}</span>
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
