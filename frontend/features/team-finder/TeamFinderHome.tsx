"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus, Users } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { SearchInput } from "@/components/shared/SearchInput";
import { Select } from "@/components/shared/Select";
import { Tabs } from "@/components/shared/Tabs";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { useAsync } from "@/hooks/useAsync";
import { useSaved } from "@/hooks/useSaved";
import { profiles, teams } from "@/services";
import { useAuth } from "@/features/auth/AuthProvider";
import { COLLAB_MODES, PROJECT_CATEGORIES, SKILL_OPTIONS } from "./constants";
import { DEFAULT_TEAM_FILTERS, filterOpportunities, filterStudents, type TeamFilters } from "./filters";
import { OpportunityCard } from "./OpportunityCard";
import { StudentCard } from "./StudentCard";

export function TeamFinderHome() {
  const { user } = useAuth();
  const { data, loading, error, reload } = useAsync(async () => ({ students: await profiles.list(), opps: await teams.list() }), []);
  const { isSaved, toggle } = useSaved();
  const [tab, setTab] = useState<"projects" | "students">("projects");
  const [f, setF] = useState<TeamFilters>(DEFAULT_TEAM_FILTERS);
  const set = <K extends keyof TeamFilters>(k: K, v: TeamFilters[K]) => setF((p) => ({ ...p, [k]: v }));
  const students = useMemo(() => filterStudents((data?.students ?? []).filter((s) => s.id !== user?.id), f), [data, f, user]);
  const opps = useMemo(() => filterOpportunities(data?.opps ?? [], f), [data, f]);
  const shown = tab === "projects" ? opps.length : students.length;

  return (
    <PageContainer>
      <PageHeader title="Team Finder" description="Find teammates by skill, or post a project and let others apply."
        actions={<Link href="/team-finder/create" className={buttonVariants({ size: "lg" })}><Plus aria-hidden />Post opportunity</Link>} />
      <FilterBar>
        <Tabs label="View" value={tab} onChange={setTab} tabs={[{ value: "projects", label: "Projects" }, { value: "students", label: "Students" }]} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SearchInput value={f.q} onChange={(v) => set("q", v)} placeholder={tab === "projects" ? "Search projects" : "Search students"} />
          <Select label="Skill" value={f.skill} onChange={(v) => set("skill", v)} options={["All", ...SKILL_OPTIONS].map((s) => ({ value: s, label: s === "All" ? "Any skill" : s }))} />
          {tab === "projects"
            ? <Select label="Project category" value={f.category} onChange={(v) => set("category", v)} options={["All", ...PROJECT_CATEGORIES].map((s) => ({ value: s, label: s === "All" ? "All categories" : s }))} />
            : <Select label="Availability" value={f.availability} onChange={(v) => set("availability", v)} options={[{ value: "All", label: "Any availability" }, { value: "open", label: "Open to teams" }, { value: "limited", label: "Limited time" }]} />}
        </div>
      </FilterBar>
      {loading && <LoadingSkeleton />}
      {error && <ErrorState message={error} onRetry={reload} />}
      {data && (shown === 0
        ? <EmptyState icon={Users} title="No results" description="Try removing a filter or searching for a different skill." action={<Button variant="outline" onClick={() => setF(DEFAULT_TEAM_FILTERS)}>Clear filters</Button>} />
        : tab === "projects"
          ? <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{opps.map((t) => <li key={t.id}><OpportunityCard t={t} /></li>)}</ul>
          : <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{students.map((s) => <li key={s.id}><StudentCard s={s} saved={isSaved("student", s.id)} onToggleSave={() => toggle("student", s.id)} /></li>)}</ul>)}
      <p className="mt-6 text-xs text-subtle">Sample students and projects are demo data. Collaboration requests are saved in this browser and not delivered to anyone. Collaboration modes: {COLLAB_MODES.join(", ")}.</p>
    </PageContainer>
  );
}
