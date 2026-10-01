"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type NavLinkItem = {
  href: string;
  label: string;
};

export type NavLinksProps = {
  links: NavLinkItem[];
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
  className?: string;
};

export function NavLinks({
  links,
  orientation = "horizontal",
  onNavigate,
  className,
}: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul
      className={cn(
        "flex",
        orientation === "horizontal"
          ? "items-center gap-8"
          : "flex-col gap-1",
        className,
      )}
    >
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[color:var(--color-text-primary)]",
                orientation === "vertical" &&
                  "block rounded-[var(--radius-md)] px-3 py-2.5 text-base hover:bg-[color:var(--color-surface-hover)]",
                isActive
                  ? "text-[color:var(--color-text-primary)]"
                  : "text-[color:var(--color-text-muted)]",
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
