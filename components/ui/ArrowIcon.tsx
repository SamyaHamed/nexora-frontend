import { cn } from "@/lib/utils";

export type ArrowIconProps = {
  className?: string;
};

/** Points "forward" in reading direction: right in LTR, left in RTL. */
export function ArrowIcon({ className }: ArrowIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={cn("size-4 shrink-0 rtl:rotate-180", className)}
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
