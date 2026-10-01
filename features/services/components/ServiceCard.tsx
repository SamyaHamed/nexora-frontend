import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Card } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";
import type { ServiceIconName } from "../types";
import { ServiceIcon } from "./ServiceIcon";

export type ServiceCardProps = {
  icon: ServiceIconName;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
};

export function ServiceCard({ icon, title, description, href, linkLabel }: ServiceCardProps) {
  return (
    <Card interactive={Boolean(href)} className="h-full">
      <div
        aria-hidden="true"
        className="mb-5 grid size-12 place-items-center rounded-[var(--radius-md)] bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand-text)]"
      >
        <ServiceIcon name={icon} className="size-6" />
      </div>
      <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)]">{title}</h3>
      <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">{description}</p>
      {href && linkLabel ? (
        <Link
          href={href}
          className="group mt-auto inline-flex items-center gap-2 self-start rounded-[var(--radius-sm)] pt-5 text-sm font-semibold text-[color:var(--color-brand-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]"
        >
          {linkLabel}
          <span className="sr-only">: {title}</span>
          <ArrowIcon className="transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </Link>
      ) : null}
    </Card>
  );
}
