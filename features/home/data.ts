import type { ProductStatus } from "@/features/projects/types";

// Static home content until the dashboard API is wired up. Copy lives in
// messages/*.json under "Home"; keys here pick the message, and tags are
// technology names, which stay the same in every locale.

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
