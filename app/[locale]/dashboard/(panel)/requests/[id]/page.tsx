import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFormatter, getTranslations } from "next-intl/server";
import { buttonClassName } from "@/components/ui/Button";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Panel } from "@/features/dashboard/components/Panel";
import { getRequest } from "@/features/requests/api";
import { RequestStatusBadge } from "@/features/requests/components/RequestStatusBadge";
import { RequestStatusForm } from "@/features/requests/components/RequestStatusForm";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dashboard/requests/[id]">): Promise<Metadata> {
  const { id } = await params;
  const request = await getRequest(id);
  return { title: request?.name };
}

export default async function RequestPage({ params }: PageProps<"/[locale]/dashboard/requests/[id]">) {
  const { id } = await params;
  const [t, tOptions, format, request] = await Promise.all([
    getTranslations("Dashboard"),
    getTranslations("Contact.options"),
    getFormatter(),
    getRequest(id),
  ]);
  if (!request) notFound();

  const details = [
    { label: t("requests.type"), value: tOptions(`projectType.${request.projectType}`) },
    { label: t("requests.budget"), value: tOptions(`budget.${request.budget}`) },
    { label: t("requests.timeline"), value: tOptions(`timeline.${request.timeline}`) },
    {
      label: t("requests.received"),
      value: format.dateTime(new Date(request.createdAt), { dateStyle: "medium", timeStyle: "short" }),
    },
  ];

  return (
    <>
      <DashboardHeader
        title={request.name}
        back={{ href: "/dashboard/requests", label: t("requests.title") }}
        actions={<RequestStatusBadge status={request.status} />}
      />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Panel>
          <dl className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-[0.8125rem] text-[color:var(--color-text-muted)]">{t("requests.email")}</dt>
              <dd className="mt-1 font-semibold" dir="ltr">
                {request.email}
              </dd>
            </div>
            {details.map((detail) => (
              <div key={detail.label}>
                <dt className="text-[0.8125rem] text-[color:var(--color-text-muted)]">{detail.label}</dt>
                <dd className="mt-1 font-semibold">{detail.value}</dd>
              </div>
            ))}
            <div className="sm:col-span-2">
              <dt className="text-[0.8125rem] text-[color:var(--color-text-muted)]">
                {t("requests.projectDescription")}
              </dt>
              {/* Client-written text: keep their line breaks */}
              <dd className="mt-2 leading-relaxed whitespace-pre-wrap">{request.description}</dd>
            </div>
          </dl>
        </Panel>

        <div className="flex flex-col gap-6">
          <Panel title={t("requests.updateStatus")}>
            <RequestStatusForm id={request.id} status={request.status} />
          </Panel>
          <a href={`mailto:${request.email}`} className={buttonClassName({ variant: "ghost", className: "self-start" })}>
            {t("requests.reply")}
          </a>
        </div>
      </div>
    </>
  );
}
