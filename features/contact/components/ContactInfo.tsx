import type { ReactNode } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { socialKeys } from "@/config/site";
import { getSettings } from "@/features/settings/api";
import { pick } from "@/lib/localized";

const iconPaths = {
  email: "M4 4h16v16H4z M4 6l8 7 8-7",
  phone:
    "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z",
  office: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  hours: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2",
} as const;

type InfoKey = keyof typeof iconPaths;

function InfoItem({ icon, label, children }: { icon: InfoKey; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-md)] bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand-text)]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5.5"
        >
          <path d={iconPaths[icon]} />
        </svg>
      </span>
      <div>
        <dt className="text-[0.8125rem] text-[color:var(--color-text-muted)]">{label}</dt>
        <dd className="mt-1 font-semibold text-[color:var(--color-text-primary)]">{children}</dd>
      </div>
    </div>
  );
}

const linkClass =
  "rounded-[var(--radius-sm)] underline-offset-4 hover:text-[color:var(--color-brand-text)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]";

export async function ContactInfo() {
  const [t, tSocial, locale, settings] = await Promise.all([
    getTranslations("Contact.info"),
    getTranslations("Social"),
    getLocale(),
    getSettings(),
  ]);
  const { email, phone } = settings;

  return (
    <div className="flex flex-col gap-7">
      <h2 className="sr-only">{t("heading")}</h2>
      <dl className="flex flex-col gap-7">
        <InfoItem icon="email" label={t("email")}>
          <a href={`mailto:${email}`} className={linkClass}>
            {email}
          </a>
        </InfoItem>
        <InfoItem icon="phone" label={t("phone")}>
          <a href={`tel:${phone.replace(/\s+/g, "")}`} dir="ltr" className={linkClass}>
            {phone}
          </a>
        </InfoItem>
        <InfoItem icon="office" label={t("office")}>
          {pick(settings.address, locale)}
        </InfoItem>
        <InfoItem icon="hours" label={t("hours")}>
          {pick(settings.workingHours, locale)}
        </InfoItem>
      </dl>
      <div className="border-t border-[color:var(--color-border-subtle)] pt-6">
        <h3 className="sr-only">{t("social")}</h3>
        <ul className="flex flex-wrap gap-3">
          {socialKeys.map((key) => (
            <li key={key}>
              <a
                href={settings.social[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-[var(--radius-md)] border border-[color:var(--color-border)] px-4 text-sm font-medium text-[color:var(--color-text-primary)] transition-colors hover:bg-[color:var(--color-surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)]"
              >
                {tSocial(key)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
