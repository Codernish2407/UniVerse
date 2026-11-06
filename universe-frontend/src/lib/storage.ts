"use client";

export const STORAGE_KEYS = {
  session: "universe.demo.session.v1",
  profile: "universe.demo.profile.v1",
  saved: "universe.demo.saved.v1",
  savedPlaces: "universe.demo.saved.places.v1",
  settings: "universe.demo.settings.v1",
  dataPrefix: "universe.demo.data.v1.",
  cgpa: "universe.demo.cgpa.v1",
  nova: "universe.demo.nova.v1",
};

export function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function safeWrite<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage may be full or blocked */ }
}

export function clearDemoData(): void {
  if (typeof window === "undefined") return;
  Object.keys(window.localStorage).filter((key) => key.startsWith("universe.demo.")).forEach((key) => window.localStorage.removeItem(key));
}

export function makeId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `uv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
