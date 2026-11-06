"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { Skeleton } from "@/components/shared/LoadingSkeleton";
import { inputCls } from "@/components/shared/FormField";
import { useToast } from "@/components/shared/Toaster";
import { ACTIVE_UNIVERSITY } from "@/config/activeUniversity";
import { academics } from "@/services";
import { makeId } from "@/services/mock/collection";
import { computeCgpa, computeSgpa, formatGpa, parseCredits } from "@/lib/cgpa";
import { surface } from "@/lib/ui";
import { cn } from "@/lib/utils";
import type { CourseEntry, SemesterRecord } from "@/types/domain";

const SgpaChart = dynamic(() => import("./SgpaChart"), { ssr: false, loading: () => <Skeleton className="h-56" /> });
const scale = ACTIVE_UNIVERSITY.gradeScale;
const blankCourse = (): CourseEntry => ({ id: makeId("c"), name: "", credits: "", grade: "" });
const blankSem = (n: number): SemesterRecord => ({ id: makeId("s"), label: `Semester ${n}`, courses: [blankCourse(), blankCourse(), blankCourse()] });

export function CgpaCalculator() {
  const { toast } = useToast();
  const [sems, setSems] = useState<SemesterRecord[]>([]);
  const [active, setActive] = useState("");
  const [ready, setReady] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => { void academics.list().then((s) => { const init = s.length ? s : [blankSem(1)]; setSems(init); setActive(init[0].id); setReady(true); }); }, []);
  const edit = (fn: (s: SemesterRecord[]) => SemesterRecord[]) => { setSems(fn); setDirty(true); };
  const sem = sems.find((s) => s.id === active) ?? sems[0];
  const sgpa = useMemo(() => (sem ? computeSgpa(sem.courses, scale) : null), [sem]);
  const cgpa = useMemo(() => computeCgpa(sems, scale), [sems]);
  const chartData = cgpa.perSemester.filter((p) => p.sgpa !== null).map((p) => ({ label: p.label, sgpa: p.sgpa as number }));

  const patchCourse = (cid: string, p: Partial<CourseEntry>) => edit((all) => all.map((s) => (s.id === sem.id ? { ...s, courses: s.courses.map((c) => (c.id === cid ? { ...c, ...p } : c)) } : s)));
  const addSemester = () => { const n = blankSem(sems.length + 1); edit((a) => [...a, n]); setActive(n.id); };
  const removeSemester = () => { if (sems.length === 1) return; const rest = sems.filter((s) => s.id !== sem.id); edit(() => rest); setActive(rest[0].id); };

  if (!ready || !sem) return <PageContainer><Skeleton className="h-96" /></PageContainer>;
  return (
    <PageContainer>
      <PageHeader title="CGPA Calculator" description="Add courses per semester to see SGPA, then your overall CGPA."
        actions={<><Button variant="outline" size="lg" onClick={() => setConfirmReset(true)}><RotateCcw aria-hidden />Reset</Button>
          <Button size="lg" onClick={async () => { await academics.save(sems.map((s) => ({ ...s, savedAt: new Date().toISOString() }))); setDirty(false); toast("Calculation saved on this device"); }}><Save aria-hidden />Save{dirty && <span className="sr-only"> (unsaved changes)</span>}</Button></>} />
      <p className="mb-5 rounded-xl border border-warning/30 bg-warning/5 px-4 py-3 text-sm">Grade points use a configurable <strong>example</strong> scale, not verified against official {ACTIVE_UNIVERSITY.shortName} rules. Edit it in <code className="text-xs">constants/universities.ts</code>.</p>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Semesters">
              {sems.map((s) => <button key={s.id} role="tab" aria-selected={s.id === sem.id} onClick={() => setActive(s.id)} className={cn("h-10 rounded-full border px-4 text-sm", s.id === sem.id ? "border-primary bg-primary/15" : "border-border text-muted-foreground hover:bg-hover")}>{s.label}</button>)}
            </div>
            <Button variant="ghost" onClick={addSemester}><Plus aria-hidden />Add semester</Button>
          </div>
          <section className={`${surface} p-4 sm:p-5`} aria-label={`${sem.label} courses`}>
            <div className="mb-4 flex items-end gap-3">
              <div className="flex-1"><label htmlFor="semlabel" className="text-sm font-medium">Semester name</label><input id="semlabel" className={`${inputCls} mt-1.5`} value={sem.label} onChange={(e) => edit((a) => a.map((s) => (s.id === sem.id ? { ...s, label: e.target.value } : s)))} /></div>
              <Button variant="destructive" size="lg" disabled={sems.length === 1} onClick={removeSemester} aria-label={`Remove ${sem.label}`}><Trash2 aria-hidden /><span className="hidden sm:inline">Remove</span></Button>
            </div>
            <ul className="space-y-3">
              {sem.courses.map((c, i) => {
                const badCredits = c.credits.trim() !== "" && parseCredits(c.credits) === null;
                return (
                  <li key={c.id} className="grid grid-cols-[1fr_5.5rem] gap-2 sm:grid-cols-[1fr_6rem_7rem_auto]">
                    <input aria-label={`Course ${i + 1} name`} placeholder="Course name (optional)" value={c.name} onChange={(e) => patchCourse(c.id, { name: e.target.value })} className={cn(inputCls, "col-span-2 sm:col-span-1")} />
                    <div><input aria-label={`Course ${i + 1} credits`} aria-invalid={badCredits} aria-describedby={badCredits ? `cr-${c.id}` : undefined} inputMode="decimal" placeholder="Credits" value={c.credits} onChange={(e) => patchCourse(c.id, { credits: e.target.value })} className={inputCls} />
                      {badCredits && <p id={`cr-${c.id}`} role="alert" className="mt-1 text-xs text-error-soft">Enter credits above 0</p>}</div>
                    <select aria-label={`Course ${i + 1} grade`} value={c.grade} onChange={(e) => patchCourse(c.id, { grade: e.target.value })} className={inputCls}><option value="">Grade</option>{scale.grades.map((g) => <option key={g.grade} value={g.grade}>{g.grade} ({g.points})</option>)}</select>
                    <Button variant="ghost" size="icon" className="col-start-2 justify-self-end sm:col-start-auto" aria-label={`Remove course ${i + 1}`} onClick={() => edit((all) => all.map((s) => (s.id === sem.id ? { ...s, courses: s.courses.filter((x) => x.id !== c.id) } : s)))}><Trash2 aria-hidden /></Button>
                  </li>);
              })}
            </ul>
            <Button variant="outline" className="mt-4" onClick={() => edit((all) => all.map((s) => (s.id === sem.id ? { ...s, courses: [...s.courses, blankCourse()] } : s)))}><Plus aria-hidden />Add course</Button>
            {sgpa && sgpa.skipped > 0 && <p className="mt-3 text-xs text-subtle">{sgpa.skipped} row{sgpa.skipped === 1 ? "" : "s"} skipped: each course needs valid credits and a grade to count.</p>}
          </section>
        </div>
        <aside className="space-y-4" aria-live="polite">
          <div className="grid grid-cols-2 gap-3"><StatCard label={`${sem.label} SGPA`} value={formatGpa(sgpa?.sgpa ?? null)} hint={`${sgpa?.totalCredits ?? 0} credits`} /><StatCard label="Overall CGPA" value={formatGpa(cgpa.cgpa)} hint={`${cgpa.totalCredits} credits`} /></div>
          <section className={`${surface} p-4`}><h2 className="mb-2 text-sm font-semibold">Semester history</h2>
            <ul className="divide-y divide-border text-sm">{cgpa.perSemester.map((p) => <li key={p.id} className="flex justify-between py-2"><span>{p.label}</span><span className="text-muted-foreground">{formatGpa(p.sgpa)} · {p.credits} cr</span></li>)}</ul></section>
          {chartData.length > 0 && <section className={`${surface} p-4`}><h2 className="mb-2 text-sm font-semibold">SGPA by semester</h2><SgpaChart data={chartData} /></section>}
          <section className={`${surface} p-4 text-sm text-muted-foreground`}><h2 className="mb-2 text-sm font-semibold text-foreground">How it&apos;s calculated</h2>
            <p>SGPA = Σ(credits × grade points) ÷ Σ credits.</p><p className="mt-1.5">CGPA = Σ(semester credits × SGPA) ÷ Σ all credits.</p>
            <p className="mt-2"><StatusBadge tone="warning">Example scale</StatusBadge> {scale.label}</p></section>
        </aside>
      </div>
      <ConfirmationDialog open={confirmReset} onOpenChange={setConfirmReset} title="Reset calculator?" description="This clears every semester and your saved calculation on this device." confirmLabel="Reset" destructive
        onConfirm={async () => { await academics.clear(); const s = blankSem(1); setSems([s]); setActive(s.id); setDirty(false); toast("Calculator reset"); }} />
    </PageContainer>
  );
}
