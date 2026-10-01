import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Horizontally scrollable on small screens; the page itself never scrolls sideways. */
export function Table({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        {children}
      </table>
    </div>
  );
}

export function Th({ className, children, ...props }: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      scope="col"
      className={cn(
        "border-b border-[color:var(--color-border-subtle)] px-4 py-3 text-start text-xs font-semibold whitespace-nowrap text-[color:var(--color-text-muted)] first:ps-6 last:pe-6",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function Td({ className, children, ...props }: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className={cn(
        "border-b border-[color:var(--color-border-subtle)] px-4 py-3.5 align-middle text-[color:var(--color-text-primary)] first:ps-6 last:pe-6",
        className,
      )}
      {...props}
    >
      {children}
    </td>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p className="px-6 py-10 text-center text-sm text-[color:var(--color-text-muted)]">{children}</p>
  );
}
