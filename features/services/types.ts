import type { Localized } from "@/lib/localized";

export const serviceIcons = ["code", "system", "ux", "api", "db", "support"] as const;

export type ServiceIconName = (typeof serviceIcons)[number];

export type Service = {
  /** URL-safe; doubles as the anchor on the Services page (/services#web). */
  id: string;
  icon: ServiceIconName;
  title: Localized;
  description: Localized;
  features: Localized<string[]>;
  /** Ascending display order. */
  order: number;
  published: boolean;
};

export type ServiceInput = Omit<Service, "id">;
