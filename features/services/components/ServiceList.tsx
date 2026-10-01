import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { pick } from "@/lib/localized";
import { listServices } from "../api";

export async function ServiceList() {
  const [locale, services] = await Promise.all([
    getLocale(),
    listServices({ publishedOnly: true }),
  ]);

  return (
    <Section>
      <Container>
        <ol>
          {services.map((service, index) => (
            <li
              key={service.id}
              id={service.id}
              // Clears the sticky header when jumped to from /services#<id>
              className="grid scroll-mt-24 items-start gap-6 border-t border-[color:var(--color-border-subtle)] py-10 md:grid-cols-2 md:gap-8 lg:scroll-mt-28 lg:grid-cols-3"
            >
              <div className="flex items-start gap-5 md:col-span-2 lg:col-span-1">
                <span className="pt-2 font-mono text-sm font-medium text-[color:var(--color-brand-text)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-[clamp(1.5rem,2.4vw,1.875rem)] font-bold text-[color:var(--color-text-primary)] rtl:leading-[1.4]">
                  {pick(service.title, locale)}
                </h2>
              </div>
              <p className="text-[color:var(--color-text-muted)]">{pick(service.description, locale)}</p>
              <ul className="flex flex-col gap-2.5 text-[0.9375rem] text-[color:var(--color-text-primary)]">
                {pick(service.features, locale).map((feature) => (
                  <li key={feature} className="flex items-baseline gap-2.5">
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 -translate-y-0.5 rounded-full bg-[color:var(--color-brand)]"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
