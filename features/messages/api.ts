import "server-only";
import { randomUUID } from "node:crypto";
import type { ContactMessageInput } from "@/features/contact/types";
import { USE_MOCK_API } from "@/lib/api";
import { backendFetch } from "@/lib/api-server";
import { mockDb } from "@/lib/mock/db";
import type { ContactMessage } from "./types";

const newestFirst = (a: ContactMessage, b: ContactMessage) => b.createdAt.localeCompare(a.createdAt);

export async function listMessages({ unreadOnly = false } = {}): Promise<ContactMessage[]> {
  const all = USE_MOCK_API
    ? structuredClone(mockDb().messages)
    : await backendFetch<ContactMessage[]>("/contact-messages", { auth: true });
  return all.filter((message) => !unreadOnly || !message.read).sort(newestFirst);
}

export async function getMessage(id: string): Promise<ContactMessage | null> {
  if (USE_MOCK_API) {
    const message = mockDb().messages.find((item) => item.id === id);
    return message ? structuredClone(message) : null;
  }
  return backendFetch<ContactMessage>(`/contact-messages/${encodeURIComponent(id)}`, { auth: true }).catch(
    () => null,
  );
}

export async function setMessageRead(id: string, read: boolean): Promise<void> {
  if (!USE_MOCK_API) {
    await backendFetch(`/contact-messages/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: { read },
      auth: true,
    });
    return;
  }
  const message = mockDb().messages.find((item) => item.id === id);
  if (message) message.read = read;
}

export async function deleteMessage(id: string): Promise<void> {
  if (!USE_MOCK_API) {
    await backendFetch(`/contact-messages/${encodeURIComponent(id)}`, { method: "DELETE", auth: true });
    return;
  }
  const db = mockDb();
  db.messages = db.messages.filter((item) => item.id !== id);
}

/** Mock only: the public form posts straight to the real API otherwise. */
export function insertMockMessage(input: ContactMessageInput): ContactMessage {
  const message: ContactMessage = {
    ...input,
    id: randomUUID(),
    read: false,
    createdAt: new Date().toISOString(),
  };
  mockDb().messages.push(message);
  return message;
}
