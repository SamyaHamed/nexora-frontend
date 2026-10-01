"use server";

import { requireAdmin } from "@/features/auth/session";
import { redirectTo, revalidateSite } from "@/features/dashboard/server";
import { failed, invalid, type ActionState } from "@/lib/action-state";
import { createProduct, deleteProduct, updateProduct } from "./api";
import { parseProductForm } from "./schema";

/** Creates when `id` is null, otherwise updates. */
export async function saveProduct(id: string | null, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseProductForm(formData);
  if (!parsed.ok) return invalid(parsed.errors);

  let createdId: string | null = null;
  try {
    if (id) await updateProduct(id, parsed.data);
    else createdId = (await createProduct(parsed.data)).id;
  } catch {
    return failed();
  }

  revalidateSite();
  if (createdId) await redirectTo(`/dashboard/coming-soon/${createdId}?notice=created`);
  return { status: "success", notice: "saved" };
}

export async function removeProduct(id: string): Promise<ActionState> {
  await requireAdmin();
  try {
    await deleteProduct(id);
  } catch {
    return failed();
  }
  revalidateSite();
  return redirectTo("/dashboard/coming-soon?notice=deleted");
}
