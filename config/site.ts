export type NavLinkKey =
  | "home"
  | "about"
  | "services"
  | "projects"
  | "comingSoon"
  | "contact";

export type SocialKey = "facebook" | "instagram" | "linkedin";

export type NavLink = {
  key: NavLinkKey;
  href: string;
};

export type SocialLink = {
  key: SocialKey;
  href: string;
};

export type ContactInfo = {
  email: string;
  phone: string;
  address: string;
};

export type SiteConfig = {
  name: string;
  nav: NavLink[];
  social: SocialLink[];
  contact: ContactInfo;
};

// Placeholder values. This will be replaced by a call to the API's
// Website Settings endpoint — keep this shape stable so that swap is a
// drop-in change.
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
  social: [
    { key: "facebook", href: "https://facebook.com/nexora" },
    { key: "instagram", href: "https://instagram.com/nexora" },
    { key: "linkedin", href: "https://linkedin.com/company/nexora" },
  ],
  contact: {
    email: "hello@nexora.example",
    phone: "+970 00 000 0000",
    address: "Ramallah, Palestine",
  },
};
