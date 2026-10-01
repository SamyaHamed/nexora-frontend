import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Button, buttonClassName } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Notice } from "@/features/dashboard/components/Notice";
import { Panel } from "@/features/dashboard/components/Panel";
import { listRequests } from "@/features/requests/api";
import { RequestsTable } from "@/features/requests/components/RequestsTable";
import { requestStatuses, type RequestStatus } from "@/features/requests/types";
import { getPathname, Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dashboard/requests">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.requests" });
  return { title: t("title") };
}

function isRequestStatus(value: unknown): value is RequestStatus {
  return typeof value === "string" && (requestStatuses as readonly string[]).includes(value);
}

export default async function RequestsPage({ searchParams }: PageProps<"/[locale]/dashboard/requests">) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const status = isRequestStatus(params.status) ? params.status : undefined;

  const [t, locale, requests] = await Promise.all([
    getTranslations("Dashboard"),
    getLocale(),
    listRequests({ query, status }),
  ]);
  const filtered = Boolean(query || status);
  const exportQuery = { ...(query && { q: query }), ...(status && { status }) };

  return (
    <>
      <DashboardHeader
        title={t("requests.title")}
        description={t("requests.description")}
        actions={
          // Plain <a>: it downloads a file from a route handler, not a page.
          <a
            href={getPathname({ href: { pathname: "/dashboard/requests/export", query: exportQuery }, locale })}
            download
            className={buttonClassName({ variant: "secondary" })}
          >
            {t("requests.export")}
          </a>
        }
      />
      <Notice notice={params.notice} />

      {/* GET form: filters live in the URL, so a filtered view can be bookmarked. */}
      <form role="search" className="flex flex-wrap items-end gap-3">
        <div className="min-w-60 flex-1">
          <Input
            type="search"
            name="q"
            defaultValue={query}
            label={t("requests.searchLabel")}
            placeholder={t("requests.searchPlaceholder")}
          />
        </div>
        <div className="w-48">
          <Select
            name="status"
            label={t("requests.statusFilter")}
            defaultValue={status ?? ""}
            options={[
              { value: "", label: t("common.all") },
              ...requestStatuses.map((value) => ({ value, label: t(`requests.statuses.${value}`) })),
            ]}
          />
        </div>
        <Button type="submit" variant="secondary">
          {t("common.apply")}
        </Button>
        {filtered ? (
          <Link
            href="/dashboard/requests"
            className="inline-flex h-11 items-center rounded-[var(--radius-md)] px-3 text-sm font-medium text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]"
          >
            {t("common.clear")}
          </Link>
        ) : null}
      </form>

      <Panel flush>
        <RequestsTable
          requests={requests}
          emptyText={filtered ? t("common.noResults") : t("common.empty")}
        />
      </Panel>
    </>
  );
}
