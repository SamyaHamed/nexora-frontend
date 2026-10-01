import type { ProductStatus } from "@/features/projects/types";
import type { ServiceIconName } from "@/features/services/types";

// Static home content until the dashboard API is wired up. Copy lives in
// messages/*.json under "Home"; keys here pick the message, and tags are
// technology names, which stay the same in every locale.

export type HomeServiceKey = "web" | "systems" | "ux" | "api" | "db" | "support";

export const homeServices: { key: HomeServiceKey; icon: ServiceIconName }[] = [
  { key: "web", icon: "code" },
  { key: "systems", icon: "system" },
  { key: "ux", icon: "ux" },
  { key: "api", icon: "api" },
  { key: "db", icon: "db" },
  { key: "support", icon: "support" },
];

export type ProjectCategoryKey = "customSystem" | "mobileApp" | "website";

export const featuredProjects: {
  key: "p1" | "p2" | "p3";
  category: ProjectCategoryKey;
  tags: string[];
}[] = [
  { key: "p1", category: "customSystem", tags: ["Next.js", "Node.js", "PostgreSQL"] },
  { key: "p2", category: "mobileApp", tags: ["React Native", "Express"] },
  { key: "p3", category: "website", tags: ["Next.js", "Tailwind CSS"] },
];

export const upcomingProducts: {
  key: "u1" | "u2";
  status: ProductStatus;
  tags: string[];
}[] = [
  { key: "u1", status: "development", tags: ["React", "MongoDB"] },
  { key: "u2", status: "planning", tags: ["Next.js"] },
];

export const processSteps = ["discover", "design", "build", "launch"] as const;

export const heroStack = ["Next.js", "Node.js", "PostgreSQL"];
