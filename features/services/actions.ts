"use server";

import { requireAdmin } from "@/features/auth/session";
import { redirectTo, revalidateSite } from "@/features/dashboard/server";
import { failed, invalid, type ActionState } from "@/lib/action-state";
import { createService, deleteService, updateService } from "./api";
import { parseServiceForm } from "./schema";

/** Creates when `id` is null, otherwise updates. */
export async function saveService(id: string | null, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseServiceForm(formData);
  if (!parsed.ok) return invalid(parsed.errors);

  let createdId: string | null = null;
  try {
    if (id) await updateService(id, parsed.data);
    else createdId = (await createService(parsed.data)).id;
  } catch {
    return failed();
  }

  revalidateSite();
  if (createdId) await redirectTo(`/dashboard/services/${createdId}?notice=created`);
  return { status: "success", notice: "saved" };
}

export async function removeService(id: string): Promise<ActionState> {
  await requireAdmin();
  try {
    await deleteService(id);
  } catch {
    return failed();
  }
  revalidateSite();
  return redirectTo("/dashboard/services?notice=deleted");
}
