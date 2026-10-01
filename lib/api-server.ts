import "server-only";
import { cookies } from "next/headers";
import { API_URL, ApiError } from "./api";
import { SESSION_COOKIE } from "./session-cookie";

type BackendOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  /** Send the admin's token (from the session cookie) as a Bearer header. */
  auth?: boolean;
};

/** Server-side call to the real REST API. Not used while mocks are on. */
export async function backendFetch<T>(
  path: string,
  { method = "GET", body, auth = false }: BackendOptions = {},
): Promise<T> {
  if (!API_URL) throw new ApiError(0, "NEXT_PUBLIC_API_URL is not set");

  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new ApiError(response.status, `${method} ${path} failed with ${response.status}`);
  }
  return response.status === 204 ? (undefined as T) : ((await response.json()) as T);
}
