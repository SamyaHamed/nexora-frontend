import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { BadgeVariant } from "@/components/ui/Badge";
import type { ButtonSize, ButtonVariant } from "@/components/ui/Button";

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const buttonVariants: ButtonVariant[] = ["primary", "secondary", "ghost"];
const buttonSizes: ButtonSize[] = ["sm", "md", "lg"];
const badgeVariants: BadgeVariant[] = ["neutral", "brand", "success", "warning", "info"];

export default async function Showcase({ params }: PageProps<"/[locale]/showcase">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Showcase" });

  const buttonLabels: Record<ButtonVariant, string> = {
    primary: t("buttons.primary"),
    secondary: t("buttons.secondary"),
    ghost: t("buttons.ghost"),
  };

  const badgeLabels: Record<BadgeVariant, string> = {
    neutral: t("badges.neutral"),
    brand: t("badges.brand"),
    success: t("badges.success"),
    warning: t("badges.warning"),
    info: t("badges.info"),
  };

  return (
    <div>
      <Section>
        <Container>
          <div className="flex flex-col gap-16">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
              align="start"
            />

            {/* Buttons */}
            <div id="buttons" className="flex flex-col gap-6">
              <SectionHeading
                title={t("buttons.heading")}
                description={t("buttons.headingDescription")}
                align="start"
              />

              <div className="flex flex-col gap-4">
                {buttonVariants.map((variant) => (
                  <div key={variant} className="flex flex-wrap items-center gap-4">
                    {buttonSizes.map((size) => (
                      <Button key={size} variant={variant} size={size}>
                        {buttonLabels[variant]}
                      </Button>
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button loading>{t("buttons.loading")}</Button>
                <Button disabled>{t("buttons.disabled")}</Button>
                <Button iconEnd={<ArrowIcon className="size-4 rtl:rotate-180" />}>
                  {t("buttons.withIcon")}
                </Button>
                <Button
                  variant="secondary"
                  iconStart={<ArrowIcon className="size-4 rotate-180 rtl:rotate-0" />}
                >
                  {t("buttons.withIcon")}
                </Button>
                <Button href="/" variant="ghost">
                  {t("buttons.asLink")}
                </Button>
              </div>
            </div>

            {/* Badges */}
            <div id="badges" className="flex flex-col gap-6">
              <SectionHeading
                title={t("badges.heading")}
                description={t("badges.headingDescription")}
                align="start"
              />
              <div className="flex flex-wrap gap-3">
                {badgeVariants.map((variant) => (
                  <Badge key={variant} variant={variant}>
                    {badgeLabels[variant]}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Cards */}
            <div id="cards" className="flex flex-col gap-6">
              <SectionHeading
                title={t("cards.heading")}
                description={t("cards.headingDescription")}
                align="center"
              />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                    {t("cards.title1")}
                  </h3>
                  <p className="mt-2 text-sm text-[color:var(--color-text-subtle)]">
                    {t("cards.body1")}
                  </p>
                </Card>
                <Card>
                  <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                    {t("cards.title2")}
                  </h3>
                  <p className="mt-2 text-sm text-[color:var(--color-text-subtle)]">
                    {t("cards.body2")}
                  </p>
                </Card>
                <Card
                  image={
                    <Image
                      src="/globe.svg"
                      alt=""
                      width={640}
                      height={360}
                      className="size-full bg-[color:var(--color-surface)] object-contain p-10"
                    />
                  }
                >
                  <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                    {t("cards.title3")}
                  </h3>
                  <p className="mt-2 text-sm text-[color:var(--color-text-subtle)]">
                    {t("cards.body3")}
                  </p>
                </Card>
              </div>
            </div>

            {/* Form fields */}
            <div id="form" className="flex flex-col gap-6">
              <SectionHeading
                title={t("form.heading")}
                description={t("form.headingDescription")}
                align="start"
              />
              <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
                <Input
                  label={t("form.nameLabel")}
                  placeholder={t("form.namePlaceholder")}
                  helperText={t("form.nameHelper")}
                  required
                />
                <Input
                  type="email"
                  label={t("form.emailLabel")}
                  placeholder={t("form.emailPlaceholder")}
                  error={t("form.emailError")}
                  defaultValue="not-an-email"
                  required
                />
                <Select
                  label={t("form.budgetLabel")}
                  placeholder={t("form.budgetPlaceholder")}
                  options={[
                    { value: "1-5k", label: t("form.budgetOption1") },
                    { value: "5-15k", label: t("form.budgetOption2") },
                    { value: "15k+", label: t("form.budgetOption3") },
                  ]}
                />
                <div className="sm:col-span-2">
                  <Textarea
                    label={t("form.messageLabel")}
                    placeholder={t("form.messagePlaceholder")}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit">{t("form.submit")}</Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
