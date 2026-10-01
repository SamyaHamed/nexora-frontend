"use server";

import { requireAdmin } from "@/features/auth/session";
import { redirectTo, revalidateSite } from "@/features/dashboard/server";
import { failed, type ActionState } from "@/lib/action-state";
import { deleteMessage, setMessageRead } from "./api";

export async function markMessage(id: string, read: boolean): Promise<ActionState> {
  await requireAdmin();
  try {
    await setMessageRead(id, read);
  } catch {
    return failed();
  }
  revalidateSite();
  return { status: "success", notice: read ? "markedRead" : "markedUnread" };
}

export async function removeMessage(id: string): Promise<ActionState> {
  await requireAdmin();
  try {
    await deleteMessage(id);
  } catch {
    return failed();
  }
  revalidateSite();
  return redirectTo("/dashboard/messages?notice=deleted");
}
