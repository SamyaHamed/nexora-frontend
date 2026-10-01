"use server";

import { requireAdmin } from "@/features/auth/session";
import { revalidateSite } from "@/features/dashboard/server";
import { failed, invalid, type ActionState } from "@/lib/action-state";
import { checkOption, readText } from "@/lib/validation";
import { updateRequestStatus } from "./api";
import { requestStatuses, type RequestStatus } from "./types";

export async function changeRequestStatus(id: string, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const status = readText(formData, "status");
  const error = checkOption(status, requestStatuses);
  if (error) return invalid({ status: error });

  try {
    await updateRequestStatus(id, status as RequestStatus);
  } catch {
    return failed();
  }
  revalidateSite();
  return { status: "success", notice: "statusUpdated" };
}
