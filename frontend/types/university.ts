export interface GradeEntry { grade: string; points: number }
export interface GradeScale { verified: boolean; label: string; grades: GradeEntry[] }
export interface University {
  id: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  programs: string[];
  gradeScale: GradeScale;
}
