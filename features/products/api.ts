import "server-only";
import { USE_MOCK_API } from "@/lib/api";
import { backendFetch } from "@/lib/api-server";
import { mockDb, uniqueSlug } from "@/lib/mock/db";
import type { Product, ProductInput } from "./types";

// Furthest along first: launched → beta → in development → planning.
const byProgress = (a: Product, b: Product) => b.progress - a.progress;

export async function listProducts({ publishedOnly = false } = {}): Promise<Product[]> {
  const all = USE_MOCK_API
    ? structuredClone(mockDb().products)
    : await backendFetch<Product[]>("/products", { auth: !publishedOnly });
  return all.filter((product) => !publishedOnly || product.published).sort(byProgress);
}

export async function getProduct(id: string): Promise<Product | null> {
  if (USE_MOCK_API) {
    const product = mockDb().products.find((item) => item.id === id);
    return product ? structuredClone(product) : null;
  }
  return backendFetch<Product>(`/products/${encodeURIComponent(id)}`, { auth: true }).catch(() => null);
}

export async function createProduct(input: ProductInput): Promise<Product> {
  if (!USE_MOCK_API) return backendFetch<Product>("/products", { method: "POST", body: input, auth: true });

  const { products } = mockDb();
  const product: Product = {
    ...input,
    id: uniqueSlug(input.title.en, products.map((item) => item.id)),
    createdAt: new Date().toISOString(),
  };
  products.push(product);
  return structuredClone(product);
}

export async function updateProduct(id: string, input: ProductInput): Promise<void> {
  if (!USE_MOCK_API) {
    await backendFetch(`/products/${encodeURIComponent(id)}`, { method: "PUT", body: input, auth: true });
    return;
  }
  const product = mockDb().products.find((item) => item.id === id);
  if (product) Object.assign(product, input);
}

export async function deleteProduct(id: string): Promise<void> {
  if (!USE_MOCK_API) {
    await backendFetch(`/products/${encodeURIComponent(id)}`, { method: "DELETE", auth: true });
    return;
  }
  const db = mockDb();
  db.products = db.products.filter((item) => item.id !== id);
}
