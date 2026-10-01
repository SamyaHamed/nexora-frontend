import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]/dashboard">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard" });

  return {
    title: { default: t("metaTitle"), template: `%s | ${t("brand")}` },
    // Admin area: keep it out of search engines.
    robots: { index: false, follow: false },
  };
}

export default function DashboardRootLayout({ children }: LayoutProps<"/[locale]/dashboard">) {
  return <div className="flex flex-1 flex-col bg-[color:var(--color-surface)]">{children}</div>;
}
