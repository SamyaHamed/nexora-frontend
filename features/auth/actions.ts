"use server";

import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { failed, invalid, type ActionState } from "@/lib/action-state";
import { ApiError, USE_MOCK_API } from "@/lib/api";
import { backendFetch } from "@/lib/api-server";
import { mockDelay } from "@/lib/mock/db";
import { checkEmail, collectErrors, readText } from "@/lib/validation";
import { checkMockCredentials } from "./mock-admin";
import { endSession, startSession } from "./session";

export async function login(formData: FormData): Promise<ActionState> {
  const email = readText(formData, "email");
  const rawPassword = formData.get("password");
  const password = typeof rawPassword === "string" ? rawPassword : "";

  const errors = collectErrors({
    email: checkEmail(email),
    password: password ? null : { code: "required" },
  });
  if (Object.keys(errors).length > 0) return invalid(errors);

  if (USE_MOCK_API) {
    if (!checkMockCredentials(email, password)) {
      await mockDelay(500); // slow down guessing
      return failed("invalidCredentials");
    }
    await startSession();
  } else {
    try {
      const { token } = await backendFetch<{ token: string }>("/auth/login", {
        method: "POST",
        body: { email, password },
      });
      await startSession(token);
    } catch (error) {
      const status = error instanceof ApiError ? error.status : 0;
      return failed(status === 400 || status === 401 ? "invalidCredentials" : "generic");
    }
  }

  redirect({ href: "/dashboard", locale: await getLocale() });
  return { status: "success" };
}

export async function logout(): Promise<void> {
  await endSession();
  redirect({ href: "/dashboard/login", locale: await getLocale() });
}
