"use server";

import { requireAdmin } from "@/features/auth/session";
import { revalidateSite } from "@/features/dashboard/server";
import { failed, invalid, type ActionState } from "@/lib/action-state";
import { updateSettings } from "./api";
import { parseSettingsForm } from "./schema";

export async function saveSettings(formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseSettingsForm(formData);
  if (!parsed.ok) return invalid(parsed.errors);

  try {
    await updateSettings(parsed.data);
  } catch {
    return failed();
  }
  revalidateSite();
  return { status: "success", notice: "saved" };
}
