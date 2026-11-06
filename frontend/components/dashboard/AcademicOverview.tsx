import Link from "next/link";
import { StatCard } from "@/components/shared/StatCard";
import { surface } from "@/lib/ui";
import { formatGpa } from "@/lib/cgpa";

export function AcademicOverview({ cgpa, savedSemesters, semester, course }: { cgpa: number | null; savedSemesters: number; semester: number; course: string }) {
  return (
    <section aria-labelledby="acad" className={`${surface} p-4 sm:p-5`}>
      <div className="mb-3 flex items-center justify-between"><h2 id="acad" className="text-base font-semibold">Academic overview</h2><Link href="/cgpa-calculator" className="text-sm text-primary-soft hover:underline">Open calculator</Link></div>
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="CGPA" value={formatGpa(cgpa)} hint={cgpa === null ? "Not calculated yet" : "From saved semesters"} />
        <StatCard label="Semester" value={String(semester)} hint={course} />
        <StatCard label="Saved" value={String(savedSemesters)} hint={savedSemesters === 1 ? "semester" : "semesters"} />
      </div>
    </section>
  );
}
