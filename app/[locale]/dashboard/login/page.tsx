import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Logo } from "@/components/layout/Logo";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { devLoginHint } from "@/features/auth/mock-admin";
import { getSession } from "@/features/auth/session";
import { redirect } from "@/i18n/navigation";
import { USE_MOCK_API } from "@/lib/api";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dashboard/login">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.login" });
  return { title: t("metaTitle") };
}

export default async function LoginPage() {
  const [t, locale, admin] = await Promise.all([
    getTranslations("Dashboard.login"),
    getLocale(),
    getSession(),
  ]);
  if (admin) redirect({ href: "/dashboard", locale });

  const hint = USE_MOCK_API ? devLoginHint() : null;

  return (
    <main className="grid flex-1 place-items-center px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-border-card)] bg-[color:var(--color-card)] p-6 shadow-[var(--shadow-lg)] sm:p-8">
          <h1 className="font-display text-2xl font-bold text-[color:var(--color-text-primary)]">
            {t("title")}
          </h1>
          <p className="mt-1 mb-6 text-sm text-[color:var(--color-text-muted)]">{t("description")}</p>
          <LoginForm />
        </div>
        {hint ? (
          <p className="mt-6 rounded-[var(--radius-md)] border border-dashed border-[color:var(--color-border)] px-4 py-3 text-center text-sm text-[color:var(--color-text-muted)]">
            {t("devHint", hint)}
          </p>
        ) : null}
      </div>
    </main>
  );
}
