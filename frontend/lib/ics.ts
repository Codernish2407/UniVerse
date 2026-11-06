import type { CampusEvent } from "@/types/domain";

const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
const utc = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Build a valid RFC 5545 calendar file for one event. */
export function buildIcs(e: CampusEvent): string {
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//UniVerse//Demo//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
    `UID:${e.id}@universe.demo`, `DTSTAMP:${utc(new Date().toISOString())}`,
    `DTSTART:${utc(e.start)}`, `DTEND:${utc(e.end)}`,
    `SUMMARY:${esc(e.title)}`, `DESCRIPTION:${esc(e.description + " (Sample event from UniVerse demo)")}`,
    `LOCATION:${esc(e.venue)}`, "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(e: CampusEvent) {
  const blob = new Blob([buildIcs(e)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `${e.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ics`;
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
