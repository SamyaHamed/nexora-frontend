import { Container } from "@/components/ui/Container";

export type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

/** Top band of an inner page (About, Services, Projects…): eyebrow, h1, lead. */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="border-b border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface)]">
      <Container className="py-14 sm:py-18 lg:py-22">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[color:var(--color-brand-text)] rtl:text-sm rtl:normal-case rtl:tracking-normal">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-[51.25rem] font-display text-[clamp(2.375rem,4.4vw,3.5rem)] font-extrabold leading-[1.1] tracking-[var(--tracking-display)] text-[color:var(--color-text-primary)] rtl:font-bold rtl:leading-[1.35] rtl:tracking-normal">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-[38.75rem] text-lg text-[color:var(--color-text-muted)]">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
