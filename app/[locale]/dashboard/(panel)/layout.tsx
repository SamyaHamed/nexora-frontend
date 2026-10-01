import { getTranslations } from "next-intl/server";
import { requireAdmin } from "@/features/auth/session";
import { Sidebar } from "@/features/dashboard/components/Sidebar";
import { listMessages } from "@/features/messages/api";
import { listRequests } from "@/features/requests/api";
import { USE_MOCK_API } from "@/lib/api";

export default async function PanelLayout({ children }: LayoutProps<"/[locale]/dashboard">) {
  // proxy.ts only checks that a cookie exists; this verifies the session.
  const admin = await requireAdmin();
  const [t, newRequests, unreadMessages] = await Promise.all([
    getTranslations("Dashboard"),
    listRequests({ status: "new" }),
    listMessages({ unreadOnly: true }),
  ]);

  return (
    <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)]">
      <Sidebar
        admin={admin}
        counts={{ requests: newRequests.length, messages: unreadMessages.length }}
      />
      <main id="main-content" className="flex min-w-0 flex-col gap-6 px-5 py-6 sm:px-8 lg:px-10 lg:py-10">
        {USE_MOCK_API ? (
          <p className="rounded-[var(--radius-md)] border border-dashed border-[color:var(--color-border)] px-4 py-2 text-[0.8125rem] text-[color:var(--color-text-muted)]">
            {t("mockBanner")}
          </p>
        ) : null}
        {children}
      </main>
    </div>
  );
}
