import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type LogoProps = {
  size?: "sm" | "md";
  className?: string;
};

// Temporary text wordmark until a real logo asset is dropped into public/.
// Swap the <span> markup below for an <Image> once that file exists — the
// call sites (Navbar, Footer) don't need to change.
export function Logo({ size = "md", className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Nexora — Home"
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight text-[color:var(--color-text-primary)] transition-colors hover:text-[color:var(--color-brand)]",
        size === "sm" ? "text-lg" : "text-xl",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "rounded-[var(--radius-sm)] bg-[color:var(--color-brand)]",
          size === "sm" ? "size-2.5" : "size-3",
        )}
      />
      Nexora
    </Link>
  );
}
