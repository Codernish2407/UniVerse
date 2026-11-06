"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PackageSearch, Plus } from "lucide-react";
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
import { lostFound } from "@/services";
import { LF_CATEGORIES } from "./constants";
import { DEFAULT_LF_FILTERS, filterLostFound, type LfFilters } from "./filters";
import { ItemCard } from "./ItemCard";

export function LostFoundList() {
  const { data, loading, error, reload } = useAsync(() => lostFound.list(), []);
  const { isSaved, toggle } = useSaved();
  const [f, setF] = useState<LfFilters>(DEFAULT_LF_FILTERS);
  const set = <K extends keyof LfFilters>(k: K, v: LfFilters[K]) => setF((p) => ({ ...p, [k]: v }));
  const locations = useMemo(() => ["All", ...Array.from(new Set((data ?? []).map((i) => i.location)))], [data]);
  const shown = useMemo(() => filterLostFound(data ?? [], f), [data, f]);

  return (
    <PageContainer>
      <PageHeader title="Lost & Found" description="Search items reported on campus, or post one you've lost or found."
        actions={<Link href="/lost-found/create" className={buttonVariants({ size: "lg" })}><Plus aria-hidden />Create listing</Link>} />
      <FilterBar>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Tabs label="Listing type" value={f.tab} onChange={(v) => set("tab", v)} tabs={[{ value: "all", label: "All" }, { value: "lost", label: "Lost" }, { value: "found", label: "Found" }]} />
          <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" className="size-4 accent-primary" checked={f.openOnly} onChange={(e) => set("openOnly", e.target.checked)} />Hide closed listings</label>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SearchInput value={f.q} onChange={(v) => set("q", v)} placeholder="Search items" className="sm:col-span-2 lg:col-span-1" />
          <Select label="Category" value={f.category} onChange={(v) => set("category", v)} options={["All", ...LF_CATEGORIES].map((c) => ({ value: c, label: c === "All" ? "All categories" : c }))} />
          <Select label="Location" value={f.location} onChange={(v) => set("location", v)} options={locations.map((l) => ({ value: l, label: l === "All" ? "All locations" : l }))} />
          <Select label="Sort by date" value={f.sort} onChange={(v) => set("sort", v as LfFilters["sort"])} options={[{ value: "newest", label: "Newest first" }, { value: "oldest", label: "Oldest first" }]} />
        </div>
      </FilterBar>
      {loading && <LoadingSkeleton />}
      {error && <ErrorState message={error} onRetry={reload} />}
      {data && (shown.length === 0
        ? <EmptyState icon={PackageSearch} title="No listings match" description="Try a different search or clear your filters." action={<Button variant="outline" onClick={() => setF(DEFAULT_LF_FILTERS)}>Clear filters</Button>} />
        : <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{shown.map((i) => <li key={i.id} className="flex"><div className="w-full"><ItemCard item={i} saved={isSaved("lost-found", i.id)} onToggleSave={() => toggle("lost-found", i.id)} /></div></li>)}</ul>)}
      <p className="mt-6 text-xs text-subtle">Sample listings are demo data. Ownership checks and secure messaging need the real backend.</p>
    </PageContainer>
  );
}
