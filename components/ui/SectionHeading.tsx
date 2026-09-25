import { cn } from "@/lib/utils";

export type SectionHeadingAlign = "start" | "center";

export type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: SectionHeadingAlign;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center"
          ? "items-center text-center"
          : "items-start text-start",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-wide text-[color:var(--color-brand)]">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-[color:var(--color-text-muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
