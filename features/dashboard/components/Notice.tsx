import { getTranslations } from "next-intl/server";

const KNOWN_NOTICES = ["saved", "created", "deleted", "statusUpdated", "markedRead", "markedUnread"];

/** Confirmation after a redirect, e.g. /dashboard/services?notice=deleted. */
export async function Notice({ notice }: { notice: string | string[] | undefined }) {
  if (typeof notice !== "string" || !KNOWN_NOTICES.includes(notice)) return null;
  const t = await getTranslations("Dashboard.notices");

  return (
    <p
      role="status"
      className="rounded-[var(--radius-md)] border border-[color:var(--color-success)]/30 bg-[color:var(--color-success)]/10 px-4 py-3 text-sm font-medium text-[color:var(--color-success)]"
    >
      {t(notice)}
    </p>
  );
}
