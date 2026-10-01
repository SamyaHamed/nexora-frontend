import type { ReactNode } from "react";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { ProductStatus } from "../types";

export type ProjectCardProps = {
  category?: string;
  title: string;
  description: string;
  tags?: string[];
  /** Optional cover (e.g. a next/image). Falls back to an empty surface. */
  image?: ReactNode;
  status?: ProductStatus;
  statusLabel?: string;
};

const statusVariant: Record<ProductStatus, BadgeVariant> = {
  planning: "neutral",
  development: "brand",
  beta: "info",
  launched: "success",
};

export function ProjectCard({
  category,
  title,
  description,
  tags,
  image,
  status,
  statusLabel,
}: ProjectCardProps) {
  return (
    <Card
      interactive
      className="h-full"
      mediaClassName="aspect-[16/10] border-b border-[color:var(--color-border-card)] bg-[color:var(--color-surface)]"
      image={
        <>
          {image}
          {status && statusLabel ? (
            <Badge variant={statusVariant[status]} dot className="absolute start-4 top-4">
              {statusLabel}
            </Badge>
          ) : null}
        </>
      }
    >
      {category ? (
        <p className="mb-2 text-xs font-medium text-[color:var(--color-text-muted)]">{category}</p>
      ) : null}
      <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)]">{title}</h3>
      <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">{description}</p>
      {tags && tags.length > 0 ? (
        <ul className="mt-auto flex flex-wrap gap-2 pt-4">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-[var(--radius-sm)] bg-[color:var(--color-surface-hover)] px-2 py-1.5 font-mono text-xs leading-none text-[color:var(--color-text-muted)]"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </Card>
  );
}
