import "server-only";
import { timingSafeEqual } from "node:crypto";
import type { AdminUser } from "./types";

// Mock-mode login. Set MOCK_ADMIN_EMAIL / MOCK_ADMIN_PASSWORD to change it;
// the defaults only work outside production builds.
const DEV_EMAIL = "admin@nexora.test";
const DEV_PASSWORD = "nexora-admin";

function credentials(): { email: string; password: string } | null {
  const email = process.env.MOCK_ADMIN_EMAIL;
  const password = process.env.MOCK_ADMIN_PASSWORD;
  if (email && password) return { email, password };
  return process.env.NODE_ENV === "production" ? null : { email: DEV_EMAIL, password: DEV_PASSWORD };
}

export function mockAdminUser(): AdminUser {
  return { id: "admin-1", name: "Nexora Admin", email: credentials()?.email ?? DEV_EMAIL };
}

/** Shown on the login page in development so the demo is usable. */
export function devLoginHint(): { email: string; password: string } | null {
  if (process.env.NODE_ENV === "production") return null;
  return credentials();
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function checkMockCredentials(email: string, password: string): boolean {
  const expected = credentials();
  if (!expected) return false;
  // Evaluate both so timing doesn't reveal which part was wrong.
  const emailOk = safeEqual(email.toLowerCase(), expected.email.toLowerCase());
  const passwordOk = safeEqual(password, expected.password);
  return emailOk && passwordOk;
}
