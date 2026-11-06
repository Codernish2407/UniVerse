"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Home, Plus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { SearchInput } from "@/components/shared/SearchInput";
import { Select } from "@/components/shared/Select";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { inputCls } from "@/components/shared/FormField";
import { useAuth } from "@/features/auth/AuthProvider";
import { useAsync } from "@/hooks/useAsync";
import { useSaved } from "@/hooks/useSaved";
import { roommates } from "@/services";
import { scoreCompatibility } from "@/lib/compatibility";
import { ACCOMMODATIONS, LIFESTYLE_TAGS, SLEEP, STUDY } from "./constants";
import { DEFAULT_RM_FILTERS, filterRoommates, type RmFilters } from "./filters";
import { RoommateCard } from "./RoommateCard";

const opts = (all: string, list: string[]) => [{ value: "All", label: all }, ...list.map((x) => ({ value: x, label: x }))];

export function RoommateHome() {
  const { user } = useAuth();
  const { data, loading, error, reload } = useAsync(() => roommates.list(), []);
  const { isSaved, toggle } = useSaved();
  const [f, setF] = useState<RmFilters>(DEFAULT_RM_FILTERS);
  const set = <K extends keyof RmFilters>(k: K, v: RmFilters[K]) => setF((p) => ({ ...p, [k]: v }));
  const mine = data?.find((r) => r.ownerId === user?.id);
  const shown = useMemo(() => filterRoommates((data ?? []).filter((r) => r.ownerId !== user?.id), f), [data, f, user]);

  return (
    <PageContainer>
      <PageHeader title="Roommate Finder" description="Compare habits and budgets. Exact room numbers and phone numbers are never shown."
        actions={<Link href="/roommate-finder/create" className={buttonVariants({ size: "lg" })}><Plus aria-hidden />{mine ? "Edit my listing" : "Create my listing"}</Link>} />
      {!mine && data && <p className="mb-4 rounded-xl border border-accent/25 bg-accent/5 px-4 py-3 text-sm">Create your listing to see a compatibility score on every card.</p>}
      <FilterBar>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SearchInput value={f.q} onChange={(v) => set("q", v)} placeholder="Search listings" />
          <input aria-label="Maximum monthly budget in rupees" type="number" min={0} inputMode="numeric" value={f.maxBudget} onChange={(e) => set("maxBudget", e.target.value)} placeholder="Max budget ₹/month" className={inputCls} />
          <Select label="Accommodation type" value={f.accommodation} onChange={(v) => set("accommodation", v)} options={opts("Any accommodation", ACCOMMODATIONS)} />
          <Select label="Sleep schedule" value={f.sleep} onChange={(v) => set("sleep", v)} options={opts("Any sleep schedule", SLEEP)} />
          <Select label="Study preference" value={f.study} onChange={(v) => set("study", v)} options={opts("Any study style", STUDY)} />
          <Select label="Lifestyle" value={f.lifestyle} onChange={(v) => set("lifestyle", v)} options={opts("Any lifestyle", LIFESTYLE_TAGS)} />
          <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" className="size-4 accent-primary" checked={f.availableOnly} onChange={(e) => set("availableOnly", e.target.checked)} />Only people looking now</label>
        </div>
      </FilterBar>
      {loading && <LoadingSkeleton />}
      {error && <ErrorState message={error} onRetry={reload} />}
      {data && (shown.length === 0
        ? <EmptyState icon={Home} title="No listings match" description="Try a higher budget or remove a filter." action={<Button variant="outline" onClick={() => setF(DEFAULT_RM_FILTERS)}>Clear filters</Button>} />
        : <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{shown.map((r) => <li key={r.id}><RoommateCard r={r} score={mine ? scoreCompatibility(mine, r).score : undefined} saved={isSaved("roommate", r.id)} onToggleSave={() => toggle("roommate", r.id)} /></li>)}</ul>)}
      <p className="mt-6 text-xs text-subtle">Compatibility is a rule-based comparison of stated preferences, not a validated prediction. Sample listings are demo data.</p>
    </PageContainer>
  );
}
