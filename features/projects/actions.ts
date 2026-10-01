"use server";

import { requireAdmin } from "@/features/auth/session";
import { redirectTo, revalidateSite } from "@/features/dashboard/server";
import { failed, invalid, type ActionState } from "@/lib/action-state";
import { createProject, deleteProject, updateProject } from "./api";
import { parseProjectForm } from "./schema";

/** Creates when `id` is null, otherwise updates. */
export async function saveProject(id: string | null, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseProjectForm(formData);
  if (!parsed.ok) return invalid(parsed.errors);

  let createdId: string | null = null;
  try {
    if (id) await updateProject(id, parsed.data);
    else createdId = (await createProject(parsed.data)).id;
  } catch {
    return failed();
  }

  revalidateSite();
  if (createdId) await redirectTo(`/dashboard/projects/${createdId}?notice=created`);
  return { status: "success", notice: "saved" };
}

export async function removeProject(id: string): Promise<ActionState> {
  await requireAdmin();
  try {
    await deleteProject(id);
  } catch {
    return failed();
  }
  revalidateSite();
  return redirectTo("/dashboard/projects?notice=deleted");
}
