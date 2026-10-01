import { ApiError } from "@/lib/api";
import type { SubmitResponse } from "./types";

// Stand-in for the backend while NEXT_PUBLIC_API_URL is unset.
// To test the error state, submit with an email ending in "@fail.test".

const MOCK_DELAY_MS = 900;
const FAILING_EMAIL_SUFFIX = "@fail.test";

export async function mockSubmit(
  endpoint: string,
  payload: { email: string },
): Promise<SubmitResponse> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  if (payload.email.toLowerCase().endsWith(FAILING_EMAIL_SUFFIX)) {
    throw new ApiError(500, `[mock] ${endpoint} failed`);
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(`[mock api] POST ${endpoint}`, payload);
  }

  return { id: `mock-${Date.now()}` };
}
