import "server-only";
import { USE_MOCK_API } from "@/lib/api";
import { backendFetch } from "@/lib/api-server";
import { mockDb } from "@/lib/mock/db";
import type { SiteSettings } from "./types";

export async function getSettings(): Promise<SiteSettings> {
  if (USE_MOCK_API) return structuredClone(mockDb().settings);
  return backendFetch<SiteSettings>("/settings");
}

export async function updateSettings(settings: SiteSettings): Promise<void> {
  if (!USE_MOCK_API) {
    await backendFetch("/settings", { method: "PUT", body: settings, auth: true });
    return;
  }
  mockDb().settings = structuredClone(settings);
}
