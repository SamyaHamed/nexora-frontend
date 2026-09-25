import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLinks } from "@/components/layout/NavLinks";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { siteConfig } from "@/config/site";

export async function Navbar() {
  const [tNav, tNavbar] = await Promise.all([
    getTranslations("Nav"),
    getTranslations("Navbar"),
  ]);

  const links = siteConfig.nav.map((link) => ({
    href: link.href,
    label: tNav(link.key),
  }));

  const ctaHref =
    siteConfig.nav.find((link) => link.key === "contact")?.href ?? "/contact";

  return (
    <StickyHeader>
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <Logo />

        <nav aria-label={tNavbar("menuLabel")} className="hidden lg:block">
          <NavLinks links={links} />
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LangSwitcher />
          <Button href={ctaHref} size="sm">
            {tNavbar("cta")}
          </Button>
        </div>

        <MobileMenu
          links={links}
          ctaLabel={tNavbar("cta")}
          ctaHref={ctaHref}
          openLabel={tNavbar("openMenu")}
          closeLabel={tNavbar("closeMenu")}
          panelLabel={tNavbar("menuLabel")}
        />
      </Container>
    </StickyHeader>
  );
}
