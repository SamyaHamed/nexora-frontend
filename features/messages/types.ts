import type { ContactMessageInput } from "@/features/contact/types";

/** A "Send a message" submission, as stored. */
export type ContactMessage = ContactMessageInput & {
  id: string;
  read: boolean;
  createdAt: string;
};
