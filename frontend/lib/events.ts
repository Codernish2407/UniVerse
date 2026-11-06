import type { CampusEvent } from "@/types/domain";

/** Upcoming events first (soonest), then most recent past events, so lists are never empty after the sample dates pass. */
export function upcomingFirst(events: CampusEvent[], now = Date.now()): CampusEvent[] {
  const byStart = [...events].sort((a, b) => +new Date(a.start) - +new Date(b.start));
  const future = byStart.filter((e) => +new Date(e.end) >= now);
  const past = byStart.filter((e) => +new Date(e.end) < now).reverse();
  return [...future, ...past];
}
export const isUpcoming = (e: CampusEvent, now = Date.now()) => +new Date(e.end) >= now;
