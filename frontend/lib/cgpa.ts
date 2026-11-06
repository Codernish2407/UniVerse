import type { CourseEntry, SemesterRecord } from "@/types/domain";
import type { GradeScale } from "@/types/university";

export interface SgpaResult { sgpa: number | null; totalCredits: number; weightedPoints: number; skipped: number }

/** Parse a credits string; returns null for blank, negative, zero or non-numeric input. */
export function parseCredits(raw: string): number | null {
  const n = Number(raw.trim());
  return raw.trim() !== "" && Number.isFinite(n) && n > 0 && n <= 30 ? n : null;
}

/** SGPA = sum(credits x grade points) / sum(credits). Rows with bad credits or no grade are skipped. */
export function computeSgpa(courses: CourseEntry[], scale: GradeScale): SgpaResult {
  let totalCredits = 0, weightedPoints = 0, skipped = 0;
  for (const c of courses) {
    const credits = parseCredits(c.credits);
    const entry = scale.grades.find((g) => g.grade === c.grade);
    if (credits === null || !entry) { if (c.credits.trim() || c.grade || c.name.trim()) skipped++; continue; }
    totalCredits += credits;
    weightedPoints += credits * entry.points;
  }
  return { sgpa: totalCredits > 0 ? weightedPoints / totalCredits : null, totalCredits, weightedPoints, skipped };
}

export interface CgpaResult { cgpa: number | null; totalCredits: number; perSemester: { id: string; label: string; sgpa: number | null; credits: number }[] }

/** CGPA = sum(semester credits x SGPA) / total credits. */
export function computeCgpa(semesters: SemesterRecord[], scale: GradeScale): CgpaResult {
  let total = 0, weighted = 0;
  const perSemester = semesters.map((s) => {
    const r = computeSgpa(s.courses, scale);
    if (r.sgpa !== null) { total += r.totalCredits; weighted += r.weightedPoints; }
    return { id: s.id, label: s.label, sgpa: r.sgpa, credits: r.totalCredits };
  });
  return { cgpa: total > 0 ? weighted / total : null, totalCredits: total, perSemester };
}

export const formatGpa = (n: number | null) => (n === null ? "—" : n.toFixed(2));
