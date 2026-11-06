import { readStore, writeStore } from "@/lib/storage";

const DELAY_MS = 120; // simulates network latency so loading states are real
export const wait = (ms = DELAY_MS) => new Promise((r) => setTimeout(r, ms));
export const makeId = (prefix: string) => `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/** Generic persisted collection: the mock stand-in for a MongoDB collection. */
export function createCollection<T extends { id: string }>(key: string, seed: T[]) {
  const load = () => readStore<T[]>(key, seed);
  return {
    async list(): Promise<T[]> { await wait(); return load(); },
    async get(id: string): Promise<T | undefined> { await wait(); return load().find((x) => x.id === id); },
    async create(item: T): Promise<T> { await wait(); writeStore(key, [item, ...load()]); return item; },
    async update(id: string, patch: Partial<T>): Promise<T | undefined> {
      await wait();
      let out: T | undefined;
      const next = load().map((x) => (x.id === id ? (out = { ...x, ...patch }) : x));
      writeStore(key, next);
      return out;
    },
    async remove(id: string): Promise<void> { await wait(); writeStore(key, load().filter((x) => x.id !== id)); },
  };
}
