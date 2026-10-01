import type { Localized } from "@/lib/localized";

export const productStatuses = ["planning", "development", "beta", "launched"] as const;

export type ProductStatus = (typeof productStatuses)[number];

/** A Nexora product shown on the Coming Soon page. */
export type Product = {
  id: string;
  status: ProductStatus;
  /** 0–100 */
  progress: number;
  title: Localized;
  description: Localized;
  tags: string[];
  /** Shown in the home page's "Coming soon" section. */
  featured: boolean;
  published: boolean;
  createdAt: string;
};

export type ProductInput = Omit<Product, "id" | "createdAt">;
