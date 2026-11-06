import type { LostFoundItem } from "@/types/domain";
import { matchesQuery } from "@/lib/format";

export interface LfFilters { tab: "all" | "lost" | "found"; q: string; category: string; location: string; sort: "newest" | "oldest"; openOnly: boolean }
export const DEFAULT_LF_FILTERS: LfFilters = { tab: "all", q: "", category: "All", location: "All", sort: "newest", openOnly: true };

export function filterLostFound(items: LostFoundItem[], f: LfFilters): LostFoundItem[] {
  return items
    .filter((i) => (f.tab === "all" || i.kind === f.tab)
      && (f.category === "All" || i.category === f.category)
      && (f.location === "All" || i.location === f.location)
      && (!f.openOnly || i.status === "open")
      && matchesQuery(f.q, i.title, i.description, i.location, i.category))
    .sort((a, b) => (f.sort === "newest" ? +new Date(b.date) - +new Date(a.date) : +new Date(a.date) - +new Date(b.date)));
}
