"use server";

import { insertMockMessage } from "@/features/messages/api";
import { insertMockRequest } from "@/features/requests/api";
import { ApiError } from "@/lib/api";
import { mockDelay } from "@/lib/mock/db";
import { validateContactMessage, validateProjectRequest } from "./schema";
import type { ContactMessageInput, ProjectRequestInput, SubmitResponse } from "./types";

// Mock backend for the public forms: stores submissions in the in-memory db,
// so they show up in the dashboard. Public endpoints, so no admin check.
// An email ending in "@fail.test" simulates a server error.

const FAILING_EMAIL_SUFFIX = "@fail.test";

async function simulateBackend(email: string): Promise<void> {
  await mockDelay(900);
  if (email.toLowerCase().endsWith(FAILING_EMAIL_SUFFIX)) {
    throw new ApiError(500, "[mock] simulated failure");
  }
}

export async function mockSubmitProjectRequest(input: ProjectRequestInput): Promise<SubmitResponse> {
  const parsed = validateProjectRequest(input);
  if (!parsed.ok) throw new ApiError(422, "[mock] invalid project request");
  await simulateBackend(parsed.data.email);
  return { id: insertMockRequest(parsed.data).id };
}

export async function mockSubmitContactMessage(input: ContactMessageInput): Promise<SubmitResponse> {
  const parsed = validateContactMessage(input);
  if (!parsed.ok) throw new ApiError(422, "[mock] invalid contact message");
  await simulateBackend(parsed.data.email);
  return { id: insertMockMessage(parsed.data).id };
}
