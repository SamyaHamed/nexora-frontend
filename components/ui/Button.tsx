import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonSharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButtonProps = ButtonSharedProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonSharedProps> & {
    href?: undefined;
  };

type ButtonAsLinkProps = ButtonSharedProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonSharedProps> & {
    href: ComponentPropsWithoutRef<typeof Link>["href"];
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[color:var(--color-brand)] text-[color:var(--color-on-brand)] hover:bg-[color:var(--color-brand-hover)] hover:shadow-[var(--shadow-accent)]",
  secondary:
    "bg-[color:var(--color-inverse-bg)] text-[color:var(--color-inverse-text)] hover:bg-[color:var(--color-inverse-hover)]",
  ghost:
    "border border-[color:var(--color-border)] bg-transparent text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-surface-hover)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 gap-1.5 px-3.5 text-sm",
  md: "h-11 gap-2 px-5 text-sm",
  lg: "h-13 gap-2.5 px-8 text-base",
};

/** Button styling for elements that can't be <Button>, e.g. a plain <a> to a file or mailto:. */
export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}): string {
  return cn(
    "inline-flex items-center justify-center rounded-[var(--radius-md)] font-semibold transition-[background-color,box-shadow,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-outline)] disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

function Spinner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent",
        className,
      )}
    />
  );
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    iconStart,
    iconEnd,
    className,
    children,
    href,
    ...props
  },
  ref,
) {
  const classes = buttonClassName({ variant, size, className });

  const content = (
    <>
      {loading ? <Spinner /> : iconStart}
      {children}
      {!loading && iconEnd}
    </>
  );

  if (href !== undefined) {
    const linkProps = props as Omit<
      ButtonAsLinkProps,
      keyof ButtonSharedProps | "href"
    >;
    const isDisabled = loading || linkProps["aria-disabled"] === true;

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        className={cn(classes, isDisabled && "pointer-events-none opacity-50")}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }

  const buttonProps = props as Omit<
    ButtonAsButtonProps,
    keyof ButtonSharedProps | "href"
  >;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={buttonProps.type ?? "button"}
      aria-busy={loading || undefined}
      className={classes}
      {...buttonProps}
      disabled={loading || buttonProps.disabled}
    >
      {content}
    </button>
  );
});
