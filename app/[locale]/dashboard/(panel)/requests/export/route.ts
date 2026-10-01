import { getTranslations } from "next-intl/server";
import { getSession } from "@/features/auth/session";
import { listRequests } from "@/features/requests/api";
import { requestStatuses, type RequestStatus } from "@/features/requests/types";

/** Quotes a CSV cell and neutralizes spreadsheet formulas (=, +, -, @). */
function csvCell(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET(request: Request, { params }: RouteContext<"/[locale]/dashboard/requests/export">) {
  // Route handlers aren't covered by the panel layout: check the session here.
  if (!(await getSession())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { locale } = await params;
  const search = new URL(request.url).searchParams;
  const query = search.get("q")?.trim() || undefined;
  const statusParam = search.get("status");
  const status = (requestStatuses as readonly string[]).includes(statusParam ?? "")
    ? (statusParam as RequestStatus)
    : undefined;

  const [t, tOptions, tStatus, requests] = await Promise.all([
    getTranslations({ locale, namespace: "Dashboard.csv" }),
    getTranslations({ locale, namespace: "Contact.options" }),
    getTranslations({ locale, namespace: "Dashboard.requests.statuses" }),
    listRequests({ query, status }),
  ]);

  const header = ["received", "name", "email", "type", "budget", "timeline", "status", "description"].map(
    (key) => t(key),
  );
  const rows = requests.map((item) => [
    item.createdAt,
    item.name,
    item.email,
    tOptions(`projectType.${item.projectType}`),
    tOptions(`budget.${item.budget}`),
    tOptions(`timeline.${item.timeline}`),
    tStatus(item.status),
    item.description,
  ]);

  // BOM so Excel opens Arabic text as UTF-8.
  const csv = "﻿" + [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="project-requests-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
