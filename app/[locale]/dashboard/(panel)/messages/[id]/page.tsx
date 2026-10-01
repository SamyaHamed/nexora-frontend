import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFormatter, getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Panel } from "@/features/dashboard/components/Panel";
import { getMessage } from "@/features/messages/api";
import { MessageActions } from "@/features/messages/components/MessageActions";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dashboard/messages/[id]">): Promise<Metadata> {
  const { id } = await params;
  const message = await getMessage(id);
  return { title: message?.subject };
}

// Opening a message doesn't mark it read: link prefetching would trigger that
// without the admin ever seeing it. "Mark as read" is an explicit action.
export default async function MessagePage({ params }: PageProps<"/[locale]/dashboard/messages/[id]">) {
  const { id } = await params;
  const [t, format, message] = await Promise.all([
    getTranslations("Dashboard"),
    getFormatter(),
    getMessage(id),
  ]);
  if (!message) notFound();

  return (
    <>
      <DashboardHeader
        title={message.subject}
        back={{ href: "/dashboard/messages", label: t("messages.title") }}
        actions={
          <Badge variant={message.read ? "neutral" : "brand"} dot={!message.read}>
            {message.read ? t("messages.read") : t("messages.unread")}
          </Badge>
        }
      />

      <Panel>
        <dl className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-[0.8125rem] text-[color:var(--color-text-muted)]">{t("messages.from")}</dt>
            <dd className="mt-1 font-semibold">{message.name}</dd>
            <dd className="text-sm text-[color:var(--color-text-muted)]" dir="ltr">
              {message.email}
            </dd>
          </div>
          <div>
            <dt className="text-[0.8125rem] text-[color:var(--color-text-muted)]">{t("messages.received")}</dt>
            <dd className="mt-1 font-semibold">
              {format.dateTime(new Date(message.createdAt), { dateStyle: "medium", timeStyle: "short" })}
            </dd>
          </div>
        </dl>
        {/* Visitor-written text: keep their line breaks */}
        <p className="mt-6 border-t border-[color:var(--color-border-subtle)] pt-6 leading-relaxed whitespace-pre-wrap">
          {message.message}
        </p>
      </Panel>

      <MessageActions id={message.id} email={message.email} subject={message.subject} read={message.read} />
    </>
  );
}
