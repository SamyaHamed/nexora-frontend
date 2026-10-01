// Shared by proxy.ts (optimistic check) and the server session code.
export const SESSION_COOKIE = "nexora_session";

/** Admin sessions last one working day. */
export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;
