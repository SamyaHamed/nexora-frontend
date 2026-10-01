import { getFormatter, getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Panel, StatCard } from "@/features/dashboard/components/Panel";
import { EmptyState } from "@/features/dashboard/components/Table";
import { listMessages } from "@/features/messages/api";
import { listProjects } from "@/features/projects/api";
import { listRequests } from "@/features/requests/api";
import { RequestsTable } from "@/features/requests/components/RequestsTable";
import { Link } from "@/i18n/navigation";

const LATEST_REQUESTS = 5;
const RECENT_MESSAGES = 4;

const linkClass =
  "rounded-[var(--radius-sm)] text-sm font-semibold text-[color:var(--color-brand-text)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]";

export default async function OverviewPage() {
  const [t, format, requests, messages, projects] = await Promise.all([
    getTranslations("Dashboard"),
    getFormatter(),
    listRequests(),
    listMessages(),
    listProjects({ publishedOnly: true }),
  ]);
  const now = new Date();
  const unread = messages.filter((message) => !message.read);

  const stats = [
    {
      key: "newRequests",
      value: requests.filter((request) => request.status === "new").length,
    },
    {
      key: "inReview",
      value: requests.filter((request) => request.status === "inReview").length,
    },
    { key: "unread", value: unread.length },
    { key: "projects", value: projects.length },
  ] as const;

  return (
    <>
      <DashboardHeader title={t("overview.title")} description={t("overview.description")} />

      <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.key}
            label={t(`overview.stats.${stat.key}`)}
            value={stat.value}
            hint={t(`overview.stats.${stat.key}Hint`)}
          />
        ))}
      </dl>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Panel
          title={t("overview.latestRequests")}
          flush
          aside={
            <Link href="/dashboard/requests" className={linkClass}>
              {t("overview.viewAll")}
            </Link>
          }
        >
          <RequestsTable
            requests={requests.slice(0, LATEST_REQUESTS)}
            emptyText={t("common.empty")}
          />
        </Panel>

        <Panel
          title={t("overview.recentMessages")}
          aside={
            unread.length > 0 ? (
              <Badge variant="brand">{t("overview.newCount", { count: unread.length })}</Badge>
            ) : null
          }
        >
          {messages.length === 0 ? (
            <EmptyState>{t("common.empty")}</EmptyState>
          ) : (
            <ul>
              {messages.slice(0, RECENT_MESSAGES).map((message) => (
                <li key={message.id} className="border-b border-[color:var(--color-border-subtle)] last:border-b-0">
                  <Link
                    href={`/dashboard/messages/${message.id}`}
                    className="-mx-2 flex gap-3 rounded-[var(--radius-md)] px-2 py-3.5 hover:bg-[color:var(--color-surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]"
                  >
                    <span
                      aria-hidden="true"
                      className="grid size-9 shrink-0 place-items-center rounded-full bg-[color:var(--color-surface-hover)] text-[0.8125rem] font-semibold"
                    >
                      {message.name.slice(0, 1).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex justify-between gap-2">
                        <span className="flex items-center gap-2 text-sm font-semibold">
                          {!message.read ? (
                            <span className="size-2 rounded-full bg-[color:var(--color-brand)]">
                              <span className="sr-only">{t("messages.unread")}</span>
                            </span>
                          ) : null}
                          {message.name}
                        </span>
                        <span className="text-xs whitespace-nowrap text-[color:var(--color-text-muted)]">
                          {format.relativeTime(new Date(message.createdAt), now)}
                        </span>
                      </span>
                      <span className="block truncate text-[0.8125rem] text-[color:var(--color-text-muted)]">
                        {message.subject}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link href="/dashboard/messages" className={`mt-4 inline-block ${linkClass}`}>
            {t("overview.openInbox")}
          </Link>
        </Panel>
      </div>
    </>
  );
}
