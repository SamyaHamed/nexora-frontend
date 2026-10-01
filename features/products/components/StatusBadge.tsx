import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import type { ProductStatus } from "../types";

const statusVariant: Record<ProductStatus, BadgeVariant> = {
  planning: "neutral",
  development: "brand",
  beta: "info",
  launched: "success",
};

export type StatusBadgeProps = {
  status: ProductStatus;
  /** Localized label, from the "ProductStatus" messages. */
  label: string;
  className?: string;
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <Badge variant={statusVariant[status]} dot className={className}>
      {label}
    </Badge>
  );
}
