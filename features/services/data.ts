import type { ServiceIconName, ServiceKey } from "./types";

// Static until services are managed from the dashboard. Copy lives in
// messages/*.json under "Services.items.<key>"; the key doubles as the
// anchor id on the Services page (/services#web).
export const services: { key: ServiceKey; icon: ServiceIconName }[] = [
  { key: "web", icon: "code" },
  { key: "systems", icon: "system" },
  { key: "ux", icon: "ux" },
  { key: "api", icon: "api" },
  { key: "db", icon: "db" },
  { key: "support", icon: "support" },
];

export const serviceFeatureKeys = ["f1", "f2", "f3"] as const;
