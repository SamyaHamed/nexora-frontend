import "server-only";
import { USE_MOCK_API } from "@/lib/api";
import { backendFetch } from "@/lib/api-server";
import { mockDb, uniqueSlug } from "@/lib/mock/db";
import type { Service, ServiceInput } from "./types";

const byOrder = (a: Service, b: Service) => a.order - b.order;

export async function listServices({ publishedOnly = false } = {}): Promise<Service[]> {
  const all = USE_MOCK_API
    ? structuredClone(mockDb().services)
    : await backendFetch<Service[]>("/services", { auth: !publishedOnly });
  return all.filter((service) => !publishedOnly || service.published).sort(byOrder);
}

export async function getService(id: string): Promise<Service | null> {
  if (USE_MOCK_API) {
    const service = mockDb().services.find((item) => item.id === id);
    return service ? structuredClone(service) : null;
  }
  return backendFetch<Service>(`/services/${encodeURIComponent(id)}`, { auth: true }).catch(() => null);
}

export async function createService(input: ServiceInput): Promise<Service> {
  if (!USE_MOCK_API) return backendFetch<Service>("/services", { method: "POST", body: input, auth: true });

  const { services } = mockDb();
  const service: Service = {
    ...input,
    id: uniqueSlug(input.title.en, services.map((item) => item.id)),
  };
  services.push(service);
  return structuredClone(service);
}

export async function updateService(id: string, input: ServiceInput): Promise<void> {
  if (!USE_MOCK_API) {
    await backendFetch(`/services/${encodeURIComponent(id)}`, { method: "PUT", body: input, auth: true });
    return;
  }
  const service = mockDb().services.find((item) => item.id === id);
  if (service) Object.assign(service, input);
}

export async function deleteService(id: string): Promise<void> {
  if (!USE_MOCK_API) {
    await backendFetch(`/services/${encodeURIComponent(id)}`, { method: "DELETE", auth: true });
    return;
  }
  const db = mockDb();
  db.services = db.services.filter((item) => item.id !== id);
}
