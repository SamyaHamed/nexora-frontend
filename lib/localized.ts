import { routing } from "@/i18n/routing";

export type Locale = (typeof routing.locales)[number];

/** Content entered in the dashboard in every site language. */
export type Localized<T = string> = Record<Locale, T>;

export function pick<T>(value: Localized<T>, locale: string): T {
  return value[locale as Locale] ?? value[routing.defaultLocale];
}
