import type { Project } from "./types";

// Static until projects are managed from the dashboard. Copy lives in
// messages/*.json under "Projects.items.<key>"; tags are technology names,
// which stay the same in every locale.
export const projects: Project[] = [
  { key: "p1", category: "website", tags: ["Next.js", "Tailwind CSS"], featured: true },
  { key: "p2", category: "customSystem", tags: ["React", "Node.js", "PostgreSQL"], featured: true },
  { key: "p3", category: "mobileApp", tags: ["React Native", "Express"], featured: true },
  { key: "p4", category: "customSystem", tags: ["Next.js", "MongoDB"] },
  { key: "p5", category: "uxui", tags: ["Figma", "Design system"] },
  { key: "p6", category: "website", tags: ["Next.js", "Headless CMS"] },
];
