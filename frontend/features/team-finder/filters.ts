import type { StudentProfile, TeamOpportunity } from "@/types/domain";
import { matchesQuery } from "@/lib/format";

export interface TeamFilters { q: string; skill: string; category: string; availability: string }
export const DEFAULT_TEAM_FILTERS: TeamFilters = { q: "", skill: "All", category: "All", availability: "All" };

const hasSkill = (skills: string[], s: string) => s === "All" || skills.some((k) => k.toLowerCase() === s.toLowerCase());

export const filterStudents = (list: StudentProfile[], f: TeamFilters) =>
  list.filter((s) => hasSkill(s.skills, f.skill) && (f.availability === "All" || s.availability === f.availability)
    && matchesQuery(f.q, s.name, s.course, s.skills, s.interests));

export const filterOpportunities = (list: TeamOpportunity[], f: TeamFilters) =>
  list.filter((t) => hasSkill(t.skills, f.skill) && (f.category === "All" || t.category === f.category)
    && matchesQuery(f.q, t.title, t.description, t.skills, t.category));
