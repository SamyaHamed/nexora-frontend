import type { Product } from "./types";

// Static until Coming Soon products are managed from the dashboard. Copy
// lives in messages/*.json under "Products.items.<key>".
export const products: Product[] = [
  { key: "u1", status: "development", progress: 62, tags: ["Next.js", "Node.js"], featured: true },
  { key: "u2", status: "beta", progress: 85, tags: ["React", "MongoDB"] },
  { key: "u3", status: "planning", progress: 15, tags: ["Next.js"], featured: true },
  { key: "u4", status: "launched", progress: 100, tags: ["React Native"] },
];
