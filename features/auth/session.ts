import "server-only";
import { randomUUID } from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { USE_MOCK_API } from "@/lib/api";
import { backendFetch } from "@/lib/api-server";
import { mockDb } from "@/lib/mock/db";
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/session-cookie";
import { mockAdminUser } from "./mock-admin";
import type { AdminUser } from "./types";

/** The signed-in admin, or null. Verified on every request (not just in proxy). */
export const getSession = cache(async (): Promise<AdminUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  if (USE_MOCK_API) {
    return mockDb().sessions.has(token) ? mockAdminUser() : null;
  }

  try {
    return await backendFetch<AdminUser>("/auth/me", { auth: true });
  } catch {
    return null;
  }
});

/** For dashboard pages and actions: the admin, or a redirect to the login page. */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getSession();
  if (!admin) {
    redirect({ href: "/dashboard/login", locale: await getLocale() });
  }
  return admin as AdminUser;
}

export async function startSession(token?: string): Promise<void> {
  const value = token ?? randomUUID();
  if (USE_MOCK_API) mockDb().sessions.add(value);

  (await cookies()).set(SESSION_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token && USE_MOCK_API) mockDb().sessions.delete(token);
  store.delete(SESSION_COOKIE);
}
