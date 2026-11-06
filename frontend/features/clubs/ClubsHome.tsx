"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Bookmark, BookmarkCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar, ChipGroup } from "@/components/shared/FilterBar";
import { SearchInput } from "@/components/shared/SearchInput";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { useAsync } from "@/hooks/useAsync";
import { useSaved } from "@/hooks/useSaved";
import { clubs } from "@/services";
import { matchesQuery } from "@/lib/format";
import { surfaceHover } from "@/lib/ui";
import type { Club } from "@/types/domain";

function ClubCard({ c, saved, onSave }: { c: Club; saved: boolean; onSave: () => void }) {
  return (
    <div className={`${surfaceHover} relative`}>
      <Link href={`/clubs/${c.id}`} className="flex h-full flex-col gap-2 rounded-2xl p-4">
        <StatusBadge tone="brand" className="self-start">{c.category}</StatusBadge>
        <h3 className="pr-10 font-medium">{c.name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">{c.tags.map((t) => <StatusBadge key={t}>{t}</StatusBadge>)}</div>
      </Link>
      <button type="button" onClick={onSave} aria-pressed={saved} aria-label={saved ? `Unsave ${c.name}` : `Save ${c.name}`} className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-background/60">
        {saved ? <BookmarkCheck className="size-5 text-primary-soft" aria-hidden /> : <Bookmark className="size-5" aria-hidden />}</button>
    </div>
  );
}

export function ClubsHome() {
  const { data, loading, error, reload } = useAsync(() => clubs.list(), []);
  const { isSaved, toggle } = useSaved();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const cats = useMemo(() => ["All", ...Array.from(new Set((data ?? []).map((c) => c.category)))], [data]);
  const shown = useMemo(() => (data ?? []).filter((c) => (cat === "All" || c.category === cat) && matchesQuery(q, c.name, c.description, c.tags, c.activities)), [data, q, cat]);
  const filtering = q.trim() !== "" || cat !== "All";
  const featured = (data ?? []).filter((c) => c.featured);
  return (
    <PageContainer>
      <PageHeader title="Clubs" description="Find student organisations by interest. These are sample clubs, not official listings." />
      <FilterBar><SearchInput value={q} onChange={setQ} placeholder="Search clubs, skills, activities" /><ChipGroup label="Category" options={cats} value={cat} onChange={setCat} /></FilterBar>
      {loading && <LoadingSkeleton />}
      {error && <ErrorState message={error} onRetry={reload} />}
      {data && !filtering && featured.length > 0 && <section className="mb-8"><SectionHeader title="Featured" /><ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{featured.map((c) => <li key={c.id}><ClubCard c={c} saved={isSaved("club", c.id)} onSave={() => toggle("club", c.id)} /></li>)}</ul></section>}
      {data && (shown.length === 0
        ? <EmptyState icon={Users} title="No clubs found" description="Try another keyword or category." action={<Button variant="outline" onClick={() => { setQ(""); setCat("All"); }}>Clear filters</Button>} />
        : <section><SectionHeader title={filtering ? `${shown.length} result${shown.length === 1 ? "" : "s"}` : "All clubs"} /><ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{shown.map((c) => <li key={c.id}><ClubCard c={c} saved={isSaved("club", c.id)} onSave={() => toggle("club", c.id)} /></li>)}</ul></section>)}
    </PageContainer>
  );
}
