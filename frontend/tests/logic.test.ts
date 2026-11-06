import { describe, expect, it } from "vitest";
import { computeCgpa, computeSgpa, parseCredits } from "@/lib/cgpa";
import { scoreCompatibility } from "@/lib/compatibility";
import { buildIcs } from "@/lib/ics";
import { matchesQuery } from "@/lib/format";
import { ACTIVE_UNIVERSITY } from "@/config/activeUniversity";
import { ROOMMATES } from "@/data/mock/roommates";
import { EVENTS } from "@/data/mock/events";

const scale = ACTIVE_UNIVERSITY.gradeScale;
const c = (credits: string, grade: string) => ({ id: credits + grade, name: "x", credits, grade });

describe("CGPA", () => {
  it("computes SGPA as weighted average", () => {
    // (4*10 + 3*8) / 7 = 9.142857
    expect(computeSgpa([c("4", "O"), c("3", "A")], scale).sgpa).toBeCloseTo(9.1429, 3);
  });
  it("ignores invalid and zero-credit rows", () => {
    const r = computeSgpa([c("0", "O"), c("abc", "A"), c("", "B"), c("2", "A")], scale);
    expect(r.sgpa).toBe(8);
    expect(r.totalCredits).toBe(2);
  });
  it("returns null with no valid courses", () => expect(computeSgpa([], scale).sgpa).toBeNull());
  it("supports decimal credits", () => expect(parseCredits("1.5")).toBe(1.5));
  it("weights CGPA by credits, not by semester count", () => {
    const sems = [
      { id: "a", label: "S1", courses: [c("10", "O")] },
      { id: "b", label: "S2", courses: [c("2", "D")] },
    ];
    expect(computeCgpa(sems, scale).cgpa).toBeCloseTo((100 + 8) / 12, 5);
  });
});

describe("compatibility", () => {
  it("gives identical preferences a perfect score", () => {
    const a = ROOMMATES[0];
    expect(scoreCompatibility(a, { ...a, id: "z" }).score).toBe(100);
  });
  it("explains every factor and stays within 0-100", () => {
    const r = scoreCompatibility(ROOMMATES[0], ROOMMATES[2]);
    expect(r.factors).toHaveLength(6);
    expect(r.score).toBeGreaterThanOrEqual(0);
    expect(r.score).toBeLessThanOrEqual(100);
  });
});

describe("filters and calendar", () => {
  it("matches query across fields case-insensitively", () => {
    expect(matchesQuery("REACT", "Title", ["react", "node"])).toBe(true);
    expect(matchesQuery("rust", "Title", ["react"])).toBe(false);
    expect(matchesQuery("", "anything")).toBe(true);
  });
  it("builds a valid ICS with required fields and CRLF", () => {
    const ics = buildIcs(EVENTS[0]);
    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
    expect(ics).toMatch(/DTSTART:\d{8}T\d{6}Z/);
    expect(ics).toContain("END:VEVENT");
  });
});
