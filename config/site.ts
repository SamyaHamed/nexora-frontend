export type NavLinkKey =
  | "home"
  | "about"
  | "services"
  | "projects"
  | "comingSoon"
  | "contact";

export const socialKeys = ["facebook", "instagram", "linkedin"] as const;

export type SocialKey = (typeof socialKeys)[number];

export type NavLink = {
  key: NavLinkKey;
  href: string;
};

export type SiteConfig = {
  name: string;
  nav: NavLink[];
};

// Contact details and social links are edited in the dashboard (Settings).
export const siteConfig: SiteConfig = {
  name: "Nexora",
  nav: [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "projects", href: "/projects" },
    { key: "comingSoon", href: "/coming-soon" },
    { key: "contact", href: "/contact" },
  ],
};
