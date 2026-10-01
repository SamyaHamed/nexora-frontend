import { cn } from "@/lib/utils";

export type SectionHeadingAlign = "start" | "center";

export type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: SectionHeadingAlign;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col",
        align === "center"
          ? "mx-auto items-center text-center"
          : "items-start text-start",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[color:var(--color-brand-text)] rtl:text-sm rtl:normal-case rtl:tracking-normal">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="font-display text-3xl font-bold text-[color:var(--color-text-primary)] sm:text-4xl rtl:leading-[1.4]">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-lg text-[color:var(--color-text-muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
