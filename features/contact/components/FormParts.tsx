"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { HONEYPOT_FIELD } from "../schema";

/** Off-screen spam trap. Hidden from people and assistive tech alike. */
export function HoneypotField() {
  const t = useTranslations("Contact.fields");
  return (
    <div aria-hidden="true" className="absolute -start-[9999px] size-px overflow-hidden">
      <label>
        {t("honeypot")}
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function SubmitError() {
  const t = useTranslations("Contact");
  return (
    <p
      role="alert"
      className="rounded-[var(--radius-md)] border border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger)]/5 px-4 py-3 text-sm font-medium text-[color:var(--color-danger)]"
    >
      {t("submitError")}
    </p>
  );
}

export function SubmitSuccess({ onReset }: { onReset: () => void }) {
  const t = useTranslations("Contact.success");
  const headingRef = useRef<HTMLHeadingElement>(null);

  // The form this replaces held focus; move it here so the result is announced.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div
      role="status"
      className="mt-8 rounded-[var(--radius-lg)] bg-[color:var(--color-surface)] p-8 text-center"
    >
      <span
        aria-hidden="true"
        className="mx-auto grid size-14 place-items-center rounded-full border-2 border-[color:var(--color-success)] bg-[color:var(--color-card)] text-[color:var(--color-success)]"
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-6.5">
          <path
            d="M5 12l5 5L20 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mt-5 font-display text-2xl font-bold text-[color:var(--color-text-primary)] outline-none"
      >
        {t("title")}
      </h3>
      <p className="mt-2 text-[color:var(--color-text-muted)]">{t("description")}</p>
      <Button variant="ghost" className="mt-5" onClick={onReset}>
        {t("again")}
      </Button>
    </div>
  );
}
