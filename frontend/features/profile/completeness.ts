import type { StudentProfile } from "@/types/domain";

/** Returns percent complete plus the missing items so the UI can say what to add. */
export function profileCompleteness(p: StudentProfile) {
  const checks: [string, boolean][] = [
    ["Bio", p.bio.trim().length > 0], ["Skills", p.skills.length > 0], ["Interests", p.interests.length > 0],
    ["GitHub", !!p.github], ["LinkedIn", !!p.linkedin], ["Portfolio", !!p.portfolio], ["Project experience", p.projectExperience.length > 0],
  ];
  const done = checks.filter(([, ok]) => ok).length;
  return { percent: Math.round(((done + 3) / (checks.length + 3)) * 100), missing: checks.filter(([, ok]) => !ok).map(([k]) => k) }; // +3: name, course, year are always set
}
