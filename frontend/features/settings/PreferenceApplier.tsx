"use client";
import { useEffect } from "react";
import { preferences } from "@/services";

/** Applies saved appearance preferences to <html> on load. Renders nothing. */
export function PreferenceApplier() {
  useEffect(() => { void preferences.get().then((p) => { document.documentElement.dataset.reduceMotion = String(p.appearance.reduceMotion); }); }, []);
  return null;
}
