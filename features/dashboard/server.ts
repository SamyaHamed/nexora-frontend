import "server-only";
import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

/** Dashboard edits change public pages too; refresh every route. */
export function revalidateSite(): void {
  revalidatePath("/", "layout");
}

/** Locale-aware redirect for Server Actions. Must be called outside try/catch. */
export async function redirectTo(href: string): Promise<never> {
  redirect({ href, locale: await getLocale() });
  throw new Error("unreachable");
}
