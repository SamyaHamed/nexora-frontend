import "server-only";
import { createSeed } from "./seed";

// In-memory stand-in for the backend database, used while USE_MOCK_API is on.
// Lives on globalThis so it survives dev hot reloads; resets on server restart.
// Single-process only — fine for local work and demos, not for production.

type MockDb = ReturnType<typeof createSeed> & {
  /** Active admin session tokens. */
  sessions: Set<string>;
};

const globalForDb = globalThis as typeof globalThis & { __nexoraMockDb?: MockDb };

export function mockDb(): MockDb {
  globalForDb.__nexoraMockDb ??= { ...createSeed(), sessions: new Set() };
  return globalForDb.__nexoraMockDb;
}

/** Simulates network latency so loading states are visible. */
export function mockDelay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** "Website & app development" → "website-app-development" (unique among `taken`). */
export function uniqueSlug(text: string, taken: string[]): string {
  const base =
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "item";

  let slug = base;
  for (let n = 2; taken.includes(slug); n++) slug = `${base}-${n}`;
  return slug;
}
