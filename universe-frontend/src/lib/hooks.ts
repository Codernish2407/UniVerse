"use client";
import { useEffect, useState } from "react";
import { safeRead, safeWrite } from "@/lib/storage";

export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => { setValue(safeRead<T>(key, initial)); setReady(true); }, [key]);
  useEffect(() => { if (ready) safeWrite(key, value); }, [key, value, ready]);
  return [value, setValue, ready] as const;
}

export function useToast() {
  const [message, setMessage] = useState("");
  useEffect(() => { if (!message) return; const t = window.setTimeout(() => setMessage(""), 2800); return () => window.clearTimeout(t); }, [message]);
  return { message, showToast: setMessage };
}
