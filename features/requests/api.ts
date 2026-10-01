import "server-only";
import { randomUUID } from "node:crypto";
import type { ProjectRequestInput } from "@/features/contact/types";
import { USE_MOCK_API } from "@/lib/api";
import { backendFetch } from "@/lib/api-server";
import { mockDb } from "@/lib/mock/db";
import type { ProjectRequest, RequestStatus } from "./types";

export type RequestFilters = {
  /** Matches name, email or description, case-insensitively. */
  query?: string;
  status?: RequestStatus;
};

const newestFirst = (a: ProjectRequest, b: ProjectRequest) => b.createdAt.localeCompare(a.createdAt);

export async function listRequests({ query, status }: RequestFilters = {}): Promise<ProjectRequest[]> {
  if (!USE_MOCK_API) {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (status) params.set("status", status);
    const search = params.size > 0 ? `?${params}` : "";
    return backendFetch<ProjectRequest[]>(`/project-requests${search}`, { auth: true });
  }

  const needle = query?.toLowerCase();
  return structuredClone(mockDb().requests)
    .filter((request) => !status || request.status === status)
    .filter(
      (request) =>
        !needle ||
        [request.name, request.email, request.description].some((field) =>
          field.toLowerCase().includes(needle),
        ),
    )
    .sort(newestFirst);
}

export async function getRequest(id: string): Promise<ProjectRequest | null> {
  if (USE_MOCK_API) {
    const request = mockDb().requests.find((item) => item.id === id);
    return request ? structuredClone(request) : null;
  }
  return backendFetch<ProjectRequest>(`/project-requests/${encodeURIComponent(id)}`, { auth: true }).catch(
    () => null,
  );
}

export async function updateRequestStatus(id: string, status: RequestStatus): Promise<void> {
  if (!USE_MOCK_API) {
    await backendFetch(`/project-requests/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: { status },
      auth: true,
    });
    return;
  }
  const request = mockDb().requests.find((item) => item.id === id);
  if (request) request.status = status;
}

/** Mock only: the public form posts straight to the real API otherwise. */
export function insertMockRequest(input: ProjectRequestInput): ProjectRequest {
  const request: ProjectRequest = {
    ...input,
    id: randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  mockDb().requests.push(request);
  return request;
}
