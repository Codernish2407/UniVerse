import type { RoommateListing } from "@/types/domain";
import { matchesQuery } from "@/lib/format";

export interface RmFilters { q: string; maxBudget: string; accommodation: string; sleep: string; study: string; lifestyle: string; availableOnly: boolean }
export const DEFAULT_RM_FILTERS: RmFilters = { q: "", maxBudget: "", accommodation: "All", sleep: "All", study: "All", lifestyle: "All", availableOnly: true };

export function filterRoommates(list: RoommateListing[], f: RmFilters): RoommateListing[] {
  const max = Number(f.maxBudget);
  return list.filter((r) =>
    (!f.availableOnly || r.available)
    && (f.accommodation === "All" || r.accommodation === f.accommodation)
    && (f.sleep === "All" || r.sleep === f.sleep)
    && (f.study === "All" || r.study === f.study)
    && (f.lifestyle === "All" || r.lifestyle.includes(f.lifestyle))
    // A listing matches a max budget if its lowest acceptable price fits within it.
    && (!f.maxBudget || !Number.isFinite(max) || r.budgetMin <= max)
    && matchesQuery(f.q, r.displayName, r.course, r.about, r.lifestyle));
}
