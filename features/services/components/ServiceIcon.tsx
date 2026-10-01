import type { ServiceIconName } from "../types";

const paths: Record<ServiceIconName, string[]> = {
  code: ["M8 7l-5 5 5 5", "M16 7l5 5-5 5"],
  system: ["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"],
  ux: ["M4 20l4-1L19 8l-3-3L5 16l-1 4z", "M14 7l3 3"],
  api: [
    "M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5",
    "M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5",
  ],
  db: [
    "M4 5c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z",
    "M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5",
    "M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  ],
  support: [
    "M3 14v-2a9 9 0 0 1 18 0v2",
    "M21 14v3a2 2 0 0 1-2 2h-1v-6h3",
    "M3 14v3a2 2 0 0 0 2 2h1v-6H3",
  ],
};

export type ServiceIconProps = {
  name: ServiceIconName;
  className?: string;
};

export function ServiceIcon({ name, className }: ServiceIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
