"use client";
import { useCallback } from "react";
import { saved } from "@/services";
import type { SavedKind } from "@/types/domain";
import { useAsync } from "./useAsync";
import { useToast } from "@/components/shared/Toaster";

export function useSaved() {
  const { data, reload } = useAsync(() => saved.list(), []);
  const { toast } = useToast();
  const isSaved = useCallback((kind: SavedKind, id: string) => !!data?.some((s) => s.kind === kind && s.id === id), [data]);
  const toggle = useCallback(async (kind: SavedKind, id: string) => {
    const now = await saved.toggle(kind, id);
    toast(now ? "Saved to your list" : "Removed from saved");
    await reload();
  }, [reload, toast]);
  return { items: data ?? [], isSaved, toggle };
}
