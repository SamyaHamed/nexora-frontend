import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type LogoVariant = "wordmark" | "lockup";

export type LogoProps = {
  variant?: LogoVariant;
  priority?: boolean;
  /** On dark sections: sits on a white chip, since the artwork has a white ground. */
  onDark?: boolean;
  className?: string;
};

// Official artwork in public/brand — never recolor or stretch it; size by height only.
const logoAssets: Record<LogoVariant, { src: string; width: number; height: number; className: string }> = {
  // N mark + EXORA, for the navbar
  wordmark: {
    src: "/brand/nexora-wordmark.png",
    width: 1218,
    height: 190,
    className: "h-6 sm:h-7",
  },
  // Full lockup with "Software Solutions", for the footer
  lockup: {
    src: "/brand/nexora-logo.png",
    width: 1234,
    height: 273,
    className: "h-10",
  },
};

export function Logo({
  variant = "wordmark",
  priority = false,
  onDark = false,
  className,
}: LogoProps) {
  const t = useTranslations("Logo");
  const asset = logoAssets[variant];

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center rounded-[var(--radius-sm)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-focus-outline)]",
        onDark && "bg-[color:var(--color-ink-0)] px-3 py-2",
        className,
      )}
    >
      <Image
        src={asset.src}
        alt={t("homeLabel")}
        width={asset.width}
        height={asset.height}
        priority={priority}
        sizes="(min-width: 640px) 180px, 160px"
        className={cn("w-auto", asset.className)}
      />
    </Link>
  );
}
