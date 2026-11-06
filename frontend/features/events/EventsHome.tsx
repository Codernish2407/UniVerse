"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Bookmark, BookmarkCheck, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar, ChipGroup } from "@/components/shared/FilterBar";
import { SearchInput } from "@/components/shared/SearchInput";
import { Select } from "@/components/shared/Select";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { useAsync } from "@/hooks/useAsync";
import { useSaved } from "@/hooks/useSaved";
import { events } from "@/services";
import { isUpcoming } from "@/lib/events";
import { formatDateTime, matchesQuery } from "@/lib/format";
import { surfaceHover } from "@/lib/ui";
import type { CampusEvent } from "@/types/domain";

export function EventCard({ e, saved, onSave }: { e: CampusEvent; saved: boolean; onSave: () => void }) {
  return (
    <div className={`${surfaceHover} relative`}>
      <Link href={`/events/${e.id}`} className="flex h-full flex-col gap-2 rounded-2xl p-4">
        <div className="flex gap-2"><StatusBadge tone="brand">{e.category}</StatusBadge>{!isUpcoming(e) && <StatusBadge>Past</StatusBadge>}</div>
        <h3 className="pr-10 font-medium">{e.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{e.description}</p>
        <p className="mt-auto space-y-0.5 pt-1 text-xs text-subtle"><span className="flex items-center gap-1.5"><CalendarDays className="size-3.5" aria-hidden />{formatDateTime(e.start)}</span><span className="flex items-center gap-1.5"><MapPin className="size-3.5" aria-hidden />{e.venue}</span></p>
      </Link>
      <button type="button" onClick={onSave} aria-pressed={saved} aria-label={saved ? `Unsave ${e.title}` : `Save ${e.title}`} className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-background/60">
        {saved ? <BookmarkCheck className="size-5 text-primary-soft" aria-hidden /> : <Bookmark className="size-5" aria-hidden />}</button>
    </div>
  );
}

type When = "upcoming" | "week" | "month" | "all";
export function EventsHome() {
  const { data, loading, error, reload } = useAsync(() => events.list(), []);
  const { isSaved, toggle } = useSaved();
  const [now] = useState(() => Date.now());
  const [q, setQ] = useState(""); const [cat, setCat] = useState("All"); const [when, setWhen] = useState<When>("upcoming");
  const cats = useMemo(() => ["All", ...Array.from(new Set((data ?? []).map((e) => e.category)))], [data]);
  const shown = useMemo(() => {
    const day = 86_400_000;
    return (data ?? []).filter((e) => {
      const t = +new Date(e.start);
      const inWindow = when === "all" ? true : when === "upcoming" ? isUpcoming(e, now) : when === "week" ? t >= now && t <= now + 7 * day : t >= now && t <= now + 30 * day;
      return inWindow && (cat === "All" || e.category === cat) && matchesQuery(q, e.title, e.description, e.organizer, e.venue);
    }).sort((a, b) => +new Date(a.start) - +new Date(b.start));
  }, [data, q, cat, when, now]);
  const featured = shown.filter((e) => e.featured).slice(0, 3);
  const reset = () => { setQ(""); setCat("All"); setWhen("upcoming"); };
  return (
    <PageContainer>
      <PageHeader title="Events" description="Discover what's on. Events here are samples, not verified university events." />
      <FilterBar>
        <div className="grid gap-3 sm:grid-cols-[1fr_14rem]"><SearchInput value={q} onChange={setQ} placeholder="Search events, venues, organisers" />
          <Select label="Date range" value={when} onChange={(v) => setWhen(v as When)} options={[{ value: "upcoming", label: "All upcoming" }, { value: "week", label: "Next 7 days" }, { value: "month", label: "Next 30 days" }, { value: "all", label: "Including past" }]} /></div>
        <ChipGroup label="Category" options={cats} value={cat} onChange={setCat} />
      </FilterBar>
      {loading && <LoadingSkeleton />}
      {error && <ErrorState message={error} onRetry={reload} />}
      {data && (shown.length === 0
        ? <EmptyState icon={CalendarDays} title="No events found" description="Try a wider date range or another category." action={<Button variant="outline" onClick={reset}>Reset filters</Button>} />
        : <>
          {featured.length > 0 && q === "" && cat === "All" && <section className="mb-8"><SectionHeader title="Featured" /><ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{featured.map((e) => <li key={e.id}><EventCard e={e} saved={isSaved("event", e.id)} onSave={() => toggle("event", e.id)} /></li>)}</ul></section>}
          <section><SectionHeader title={`${shown.length} event${shown.length === 1 ? "" : "s"}`} /><ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{shown.map((e) => <li key={e.id}><EventCard e={e} saved={isSaved("event", e.id)} onSave={() => toggle("event", e.id)} /></li>)}</ul></section></>)}
    </PageContainer>
  );
}
