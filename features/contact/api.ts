import { apiPost, USE_MOCK_API } from "@/lib/api";
import { mockSubmit } from "./mock";
import type { ContactMessageInput, ProjectRequestInput, SubmitResponse } from "./types";

// Endpoint paths are assumed until the backend's API docs are available —
// adjust them here only; the forms don't know about URLs.
const PROJECT_REQUESTS_PATH = "/project-requests";
const CONTACT_MESSAGES_PATH = "/contact-messages";

export function submitProjectRequest(input: ProjectRequestInput): Promise<SubmitResponse> {
  return USE_MOCK_API
    ? mockSubmit(PROJECT_REQUESTS_PATH, input)
    : apiPost<SubmitResponse>(PROJECT_REQUESTS_PATH, input);
}

export function submitContactMessage(input: ContactMessageInput): Promise<SubmitResponse> {
  return USE_MOCK_API
    ? mockSubmit(CONTACT_MESSAGES_PATH, input)
    : apiPost<SubmitResponse>(CONTACT_MESSAGES_PATH, input);
}
