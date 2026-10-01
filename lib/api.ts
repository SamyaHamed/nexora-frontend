/** Base URL of the Nexora REST API. Unset → features fall back to their mocks. */
export const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || undefined;

/** True when no API is configured, or mocks are forced on for local work. */
export const USE_MOCK_API = !API_URL || process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiPost<TResponse>(path: string, body: unknown): Promise<TResponse> {
  if (!API_URL) {
    throw new ApiError(0, "NEXT_PUBLIC_API_URL is not set");
  }

  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new ApiError(response.status, `POST ${path} failed with ${response.status}`);
  }

  return (await response.json()) as TResponse;
}
