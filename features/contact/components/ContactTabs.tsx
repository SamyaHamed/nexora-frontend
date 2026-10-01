"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ContactMessageForm } from "./ContactMessageForm";
import { ProjectRequestForm } from "./ProjectRequestForm";

const tabs = ["project", "message"] as const;
type Tab = (typeof tabs)[number];

// WAI-ARIA tabs: arrow keys move between tabs (mirrored in RTL), and both
// panels stay mounted so a half-filled form survives switching tabs.
export function ContactTabs() {
  const t = useTranslations("Contact.tabs");
  const isRtl = useLocale() === "ar";
  const baseId = useId();
  const [active, setActive] = useState<Tab>("project");
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ project: null, message: null });

  function select(tab: Tab) {
    setActive(tab);
    tabRefs.current[tab]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = tabs.indexOf(active);
    const next = isRtl ? "ArrowLeft" : "ArrowRight";
    const previous = isRtl ? "ArrowRight" : "ArrowLeft";

    if (event.key === next) select(tabs[(index + 1) % tabs.length]);
    else if (event.key === previous) select(tabs[(index - 1 + tabs.length) % tabs.length]);
    else if (event.key === "Home") select(tabs[0]);
    else if (event.key === "End") select(tabs[tabs.length - 1]);
    else return;
    event.preventDefault();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={t("label")}
        onKeyDown={handleKeyDown}
        className="flex gap-1 rounded-[0.875rem] bg-[color:var(--color-surface-hover)] p-1"
      >
        {tabs.map((tab) => {
          const selected = tab === active;
          return (
            <button
              key={tab}
              ref={(element) => {
                tabRefs.current[tab] = element;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab)}
              className={cn(
                "h-11 flex-1 rounded-[0.625rem] px-3 text-[0.9375rem] transition-colors duration-[var(--duration-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]",
                selected
                  ? "bg-[color:var(--color-card)] font-semibold text-[color:var(--color-text-primary)] shadow-[var(--shadow-sm)]"
                  : "font-medium text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)]",
              )}
            >
              {t(tab)}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab}
          role="tabpanel"
          id={`${baseId}-panel-${tab}`}
          aria-labelledby={`${baseId}-tab-${tab}`}
          hidden={tab !== active}
        >
          {tab === "project" ? <ProjectRequestForm /> : <ContactMessageForm />}
        </div>
      ))}
    </div>
  );
}
