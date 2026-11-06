import type { RoommateListing } from "@/types/domain";

export interface CompatibilityFactor { label: string; points: number; max: number; detail: string }
export interface CompatibilityResult { score: number; factors: CompatibilityFactor[] }

/**
 * Transparent rule-based score (0-100). It only compares stated preferences;
 * it is NOT a validated prediction of how two people will get along.
 */
export function scoreCompatibility(me: RoommateListing, other: RoommateListing): CompatibilityResult {
  const f: CompatibilityFactor[] = [];
  const sameAcc = me.accommodation === other.accommodation;
  f.push({ label: "Accommodation", max: 20, points: sameAcc ? 20 : 0, detail: sameAcc ? `Both want ${me.accommodation}` : `${me.accommodation} vs ${other.accommodation}` });

  const overlap = Math.min(me.budgetMax, other.budgetMax) - Math.max(me.budgetMin, other.budgetMin);
  const span = Math.max(1, Math.min(me.budgetMax - me.budgetMin, other.budgetMax - other.budgetMin));
  const budgetPts = overlap <= 0 ? 0 : Math.round(20 * Math.min(1, overlap / span));
  f.push({ label: "Budget", max: 20, points: budgetPts, detail: overlap > 0 ? "Budget ranges overlap" : "Budget ranges do not overlap" });

  const sleepRank = { "Early bird": 0, Flexible: 1, "Night owl": 2 } as const;
  const sd = Math.abs(sleepRank[me.sleep] - sleepRank[other.sleep]);
  f.push({ label: "Sleep schedule", max: 20, points: sd === 0 ? 20 : sd === 1 ? 12 : 0, detail: sd === 0 ? `Both ${me.sleep.toLowerCase()}` : `${me.sleep} vs ${other.sleep}` });

  const studyOk = me.study === other.study ? 15 : me.study === "Flexible" || other.study === "Flexible" ? 10 : 0;
  f.push({ label: "Study habits", max: 15, points: studyOk, detail: me.study === other.study ? `Both prefer: ${me.study}` : `${me.study} vs ${other.study}` });

  const cd = Math.abs(me.cleanliness - other.cleanliness);
  f.push({ label: "Cleanliness", max: 15, points: Math.max(0, 15 - cd * 5), detail: `Rated ${me.cleanliness}/5 and ${other.cleanliness}/5` });

  const sharing = me.sharing === other.sharing;
  f.push({ label: "Room sharing", max: 10, points: sharing ? 10 : 0, detail: sharing ? `Both want a ${me.sharing.toLowerCase()} room` : `${me.sharing} vs ${other.sharing}` });

  return { score: f.reduce((a, x) => a + x.points, 0), factors: f };
}
