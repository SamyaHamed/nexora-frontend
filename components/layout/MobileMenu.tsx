"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { NavLinks, type NavLinkItem } from "@/components/layout/NavLinks";

export type MobileMenuProps = {
  links: NavLinkItem[];
  ctaLabel: string;
  ctaHref: string;
  openLabel: string;
  closeLabel: string;
  panelLabel: string;
};

export function MobileMenu({
  links,
  ctaLabel,
  ctaHref,
  openLabel,
  closeLabel,
  panelLabel,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={openLabel}
        className="inline-flex size-10 items-center justify-center rounded-[var(--radius-md)] text-[color:var(--color-text-primary)] transition-colors hover:bg-[color:var(--color-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-bg)]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-6">
          <path
            d="M4 6h16M4 12h16M4 18h16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label={panelLabel}
          className="fixed inset-0 z-50 flex flex-col bg-[color:var(--color-bg)]"
        >
          <div className="flex items-center justify-end px-4 py-3 sm:px-6">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label={closeLabel}
              className="inline-flex size-10 items-center justify-center rounded-[var(--radius-md)] text-[color:var(--color-text-primary)] transition-colors hover:bg-[color:var(--color-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-bg)]"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-6">
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-6 pb-10">
            <NavLinks
              links={links}
              orientation="vertical"
              onNavigate={() => setOpen(false)}
            />
            <div className="flex flex-col gap-4">
              <LangSwitcher />
              <Button
                href={ctaHref}
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
