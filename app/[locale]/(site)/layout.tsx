import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default async function SiteLayout({ children }: LayoutProps<"/[locale]">) {
  const t = await getTranslations("Layout");

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-md)] focus:bg-[color:var(--color-brand)] focus:px-4 focus:py-2 focus:text-[color:var(--color-on-brand)] focus:outline-none"
      >
        {t("skipToContent")}
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
