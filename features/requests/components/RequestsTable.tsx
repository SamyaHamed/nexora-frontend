import { getFormatter, getTranslations } from "next-intl/server";
import { EmptyState, Table, Td, Th } from "@/features/dashboard/components/Table";
import { Link } from "@/i18n/navigation";
import type { ProjectRequest } from "../types";
import { RequestStatusBadge } from "./RequestStatusBadge";

const SUMMARY_LENGTH = 60;

function summarize(text: string): string {
  return text.length > SUMMARY_LENGTH ? `${text.slice(0, SUMMARY_LENGTH).trimEnd()}…` : text;
}

export async function RequestsTable({
  requests,
  emptyText,
}: {
  requests: ProjectRequest[];
  emptyText: string;
}) {
  const [t, tOptions, format] = await Promise.all([
    getTranslations("Dashboard"),
    getTranslations("Contact.options"),
    getFormatter(),
  ]);

  if (requests.length === 0) return <EmptyState>{emptyText}</EmptyState>;

  return (
    <Table caption={t("requests.title")}>
      <thead>
        <tr>
          <Th>{t("requests.client")}</Th>
          <Th>{t("requests.type")}</Th>
          <Th>{t("requests.budget")}</Th>
          <Th>{t("requests.timeline")}</Th>
          <Th>{t("requests.received")}</Th>
          <Th>{t("requests.status")}</Th>
          <Th>
            <span className="sr-only">{t("common.actions")}</span>
          </Th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request.id}>
            <Td className="min-w-56">
              <p className="font-semibold">{request.name}</p>
              <p className="text-[0.8125rem] text-[color:var(--color-text-muted)]">
                {summarize(request.description)}
              </p>
            </Td>
            <Td className="whitespace-nowrap">{tOptions(`projectType.${request.projectType}`)}</Td>
            <Td className="whitespace-nowrap">{tOptions(`budget.${request.budget}`)}</Td>
            <Td className="whitespace-nowrap">{tOptions(`timeline.${request.timeline}`)}</Td>
            <Td className="whitespace-nowrap text-[color:var(--color-text-muted)]">
              {format.dateTime(new Date(request.createdAt), { dateStyle: "medium" })}
            </Td>
            <Td className="whitespace-nowrap">
              <RequestStatusBadge status={request.status} />
            </Td>
            <Td className="text-end whitespace-nowrap">
              <Link
                href={`/dashboard/requests/${request.id}`}
                className="inline-flex h-9 items-center rounded-[var(--radius-md)] border border-[color:var(--color-border)] px-3.5 text-sm font-semibold hover:bg-[color:var(--color-surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]"
              >
                {t("common.view")}
                <span className="sr-only">: {request.name}</span>
              </Link>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
