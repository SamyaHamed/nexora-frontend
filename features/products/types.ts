export const productStatuses = ["planning", "development", "beta", "launched"] as const;

export type ProductStatus = (typeof productStatuses)[number];

export type ProductKey = "u1" | "u2" | "u3" | "u4";

export type Product = {
  key: ProductKey;
  status: ProductStatus;
  /** 0–100 */
  progress: number;
  tags: string[];
  /** Shown in the home page's "Coming soon" section. */
  featured?: boolean;
};
