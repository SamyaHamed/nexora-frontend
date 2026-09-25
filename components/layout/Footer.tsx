import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { Link } from "@/i18n/navigation";
import { siteConfig, type SocialKey } from "@/config/site";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M14 9h3V6h-3c-1.657 0-3 1.343-3 3v2H9v3h2v6h3v-6h3l1-3h-4v-2c0-.552.448-1 1-1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.2" cy="7.8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 10.5V16M8 8v.01M12 16v-3.2c0-1 .8-1.8 1.8-1.8s1.7.8 1.7 1.8V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const socialIcons: Record<SocialKey, (props: { className?: string }) => React.JSX.Element> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
};

export async function Footer() {
  const [tFooter, tNav, tSocial] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Nav"),
    getTranslations("Social"),
  ]);

  const year = new Date().getFullYear();
  const services = [
    tFooter("service1"),
    tFooter("service2"),
    tFooter("service3"),
    tFooter("service4"),
  ];

  return (
    <footer className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface)]">
      <Container className="flex flex-col gap-12 py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="max-w-xs text-sm text-[color:var(--color-text-muted)]">
              {tFooter("tagline")}
            </p>
            <div className="flex items-center gap-3">
              {siteConfig.social.map((social) => {
                const Icon = socialIcons[social.key];
                return (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={tSocial(social.key)}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text-muted)] transition-colors hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-[color:var(--color-text-primary)]">
              {tFooter("quickLinksHeading")}
            </h3>
            <ul className="flex flex-col gap-2">
              {siteConfig.nav.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text-primary)]"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-[color:var(--color-text-primary)]">
              {tFooter("servicesHeading")}
            </h3>
            <ul className="flex flex-col gap-2">
              {services.map((service) => (
                <li key={service} className="text-sm text-[color:var(--color-text-muted)]">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-[color:var(--color-text-primary)]">
              {tFooter("contactHeading")}
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-[color:var(--color-text-muted)]">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-[color:var(--color-text-primary)]"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="transition-colors hover:text-[color:var(--color-text-primary)]"
                  dir="ltr"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>{siteConfig.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-[color:var(--color-border-subtle)] pt-6 text-sm text-[color:var(--color-text-subtle)] sm:flex-row sm:justify-between">
          <p>{tFooter("copyright", { year, name: siteConfig.name })}</p>
        </div>
      </Container>
    </footer>
  );
}
