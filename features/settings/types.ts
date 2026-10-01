import type { SocialKey } from "@/config/site";
import type { Localized } from "@/lib/localized";

/** Company info shown in the footer and on the Contact page. */
export type SiteSettings = {
  email: string;
  phone: string;
  address: Localized;
  workingHours: Localized;
  social: Record<SocialKey, string>;
};
