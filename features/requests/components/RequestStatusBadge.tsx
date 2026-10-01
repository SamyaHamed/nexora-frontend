import { getTranslations } from "next-intl/server";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import type { RequestStatus } from "../types";

const statusVariant: Record<RequestStatus, BadgeVariant> = {
  new: "brand",
  inReview: "info",
  quoted: "neutral",
  accepted: "success",
  declined: "warning",
};

export async function RequestStatusBadge({ status }: { status: RequestStatus }) {
  const t = await getTranslations("Dashboard.requests.statuses");
  return (
    <Badge variant={statusVariant[status]} dot>
      {t(status)}
    </Badge>
  );
}
