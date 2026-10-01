import type { Metadata } from "next";
import { getFormatter, getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Notice } from "@/features/dashboard/components/Notice";
import { Panel } from "@/features/dashboard/components/Panel";
import { EmptyState, Table, Td, Th } from "@/features/dashboard/components/Table";
import { listMessages } from "@/features/messages/api";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dashboard/messages">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.messages" });
  return { title: t("title") };
}

export default async function MessagesPage({ searchParams }: PageProps<"/[locale]/dashboard/messages">) {
  const params = await searchParams;
  const unreadOnly = params.filter === "unread";
  const [t, format, messages] = await Promise.all([
    getTranslations("Dashboard"),
    getFormatter(),
    listMessages({ unreadOnly }),
  ]);

  const filters = [
    { key: "all", label: t("common.all"), href: "/dashboard/messages", active: !unreadOnly },
    { key: "unread", label: t("messages.unreadOnly"), href: "/dashboard/messages?filter=unread", active: unreadOnly },
  ];

  return (
    <>
      <DashboardHeader title={t("messages.title")} description={t("messages.description")} />
      <Notice notice={params.notice} />

      <nav aria-label={t("messages.filterLabel")}>
        <ul className="flex gap-2">
          {filters.map((filter) => (
            <li key={filter.key}>
              <Link
                href={filter.href}
                aria-current={filter.active ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]",
                  filter.active
                    ? "border-[color:var(--color-inverse-bg)] bg-[color:var(--color-inverse-bg)] text-[color:var(--color-inverse-text)]"
                    : "border-[color:var(--color-border)] bg-[color:var(--color-card)] hover:bg-[color:var(--color-surface-hover)]",
                )}
              >
                {filter.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Panel flush>
        {messages.length === 0 ? (
          <EmptyState>{t("common.empty")}</EmptyState>
        ) : (
          <Table caption={t("messages.title")}>
            <thead>
              <tr>
                <Th>{t("messages.from")}</Th>
                <Th>{t("messages.subject")}</Th>
                <Th>{t("messages.received")}</Th>
                <Th>{t("messages.status")}</Th>
                <Th>
                  <span className="sr-only">{t("common.actions")}</span>
                </Th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id}>
                  <Td className="min-w-48">
                    <p className={cn(!message.read && "font-semibold")}>{message.name}</p>
                    <p className="text-[0.8125rem] text-[color:var(--color-text-muted)]" dir="ltr">
                      {message.email}
                    </p>
                  </Td>
                  <Td className={cn("min-w-56", !message.read && "font-semibold")}>{message.subject}</Td>
                  <Td className="whitespace-nowrap text-[color:var(--color-text-muted)]">
                    {format.dateTime(new Date(message.createdAt), { dateStyle: "medium", timeStyle: "short" })}
                  </Td>
                  <Td className="whitespace-nowrap">
                    <Badge variant={message.read ? "neutral" : "brand"} dot={!message.read}>
                      {message.read ? t("messages.read") : t("messages.unread")}
                    </Badge>
                  </Td>
                  <Td className="text-end whitespace-nowrap">
                    <Link
                      href={`/dashboard/messages/${message.id}`}
                      className="inline-flex h-9 items-center rounded-[var(--radius-md)] border border-[color:var(--color-border)] px-3.5 text-sm font-semibold hover:bg-[color:var(--color-surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]"
                    >
                      {t("common.view")}
                      <span className="sr-only">: {message.subject}</span>
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
