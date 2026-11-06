/**
 * Versioned localStorage adapter for DEMO data only. Not secure storage.
 * Bump STORAGE_VERSION to invalidate all saved demo data after a schema change.
 */
const STORAGE_VERSION = "v1";
const PREFIX = `universe:${STORAGE_VERSION}:`;

export function readStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: string, value: T): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false; // quota exceeded or storage disabled
  }
}

export function removeStore(key: string) {
  if (typeof window === "undefined") return;
  try { window.localStorage.removeItem(PREFIX + key); } catch { /* ignore */ }
}

/** Remove every UniVerse demo key (used by "Reset demo data"). */
export function clearAllStores() {
  if (typeof window === "undefined") return;
  try {
    Object.keys(window.localStorage)
      .filter((k) => k.startsWith("universe:"))
      .forEach((k) => window.localStorage.removeItem(k));
  } catch { /* ignore */ }
}
