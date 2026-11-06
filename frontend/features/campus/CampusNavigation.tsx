"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Bookmark, BookmarkCheck, MapPin, Route as RouteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { ChipGroup } from "@/components/shared/FilterBar";
import { SearchInput } from "@/components/shared/SearchInput";
import { Select } from "@/components/shared/Select";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Skeleton } from "@/components/shared/LoadingSkeleton";
import { ACTIVE_UNIVERSITY_ID } from "@/config/activeUniversity";
import { useAsync } from "@/hooks/useAsync";
import { useSaved } from "@/hooks/useSaved";
import { campus } from "@/services";
import { matchesQuery } from "@/lib/format";
import { surface } from "@/lib/ui";
import { cn } from "@/lib/utils";
import type { CampusRoute } from "@/types/domain";

const CampusMap = dynamic(() => import("./CampusMap"), { ssr: false, loading: () => <Skeleton className="size-full min-h-[320px]" /> });

export function CampusNavigation() {
  const params = useSearchParams();
  const { data: c, loading, error, reload } = useAsync(() => campus.getCampus(ACTIVE_UNIVERSITY_ID), []);
  const { isSaved, toggle } = useSaved();
  const [q, setQ] = useState(""); const [cat, setCat] = useState("All"); const [savedOnly, setSavedOnly] = useState(false);
  const preset = params.get("to") ?? "";
  const [selected, setSelected] = useState<string | undefined>(preset || undefined);
  const [from, setFrom] = useState(""); const [to, setTo] = useState(preset);
  const [result, setResult] = useState<{ key: string; route: CampusRoute | null } | null>(null);
  const key = `${from}>${to}`;
  const routed = result?.key === key;
  const route = routed ? result.route : null;

  useEffect(() => {
    if (!from || !to || from === to) return;
    let live = true;
    void campus.findRoute(ACTIVE_UNIVERSITY_ID, from, to).then((r) => { if (live) setResult({ key: `${from}>${to}`, route: r }); });
    return () => { live = false; };
  }, [from, to]);

  const catLabel = (id: string) => c?.categories.find((x) => x.id === id)?.label ?? id;
  const labels = useMemo(() => ["All", ...(c?.categories.map((x) => x.label) ?? [])], [c]);
  const shown = useMemo(() => (c?.locations ?? []).filter((l) => (cat === "All" || catLabel(l.category) === cat) && (!savedOnly || isSaved("place", l.id)) && matchesQuery(q, l.name, l.description, l.landmark, catLabel(l.category))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [c, q, cat, savedOnly, isSaved]);
  const sel = c?.locations.find((l) => l.id === selected);
  const options = [{ value: "", label: "Choose a place" }, ...(c?.locations ?? []).map((l) => ({ value: l.id, label: l.name }))];

  return (
    <PageContainer wide>
      <PageHeader title="Campus Navigation" description="Find blocks and facilities, and preview demo routes." actions={<StatusBadge tone="warning">Sample layout, not a real map</StatusBadge>} />
      {loading && <Skeleton className="h-[480px]" />}
      {error && <ErrorState message={error} onRetry={reload} />}
      {c && (
        <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
          <div className="order-2 flex min-w-0 flex-col gap-3 lg:order-1 lg:max-h-[calc(100dvh-12rem)]">
            <SearchInput value={q} onChange={setQ} placeholder="Search places" label="Search campus places" />
            <ChipGroup label="Category" options={labels} value={cat} onChange={setCat} />
            <label className="flex min-h-9 items-center gap-2 text-sm"><input type="checkbox" className="size-4 accent-primary" checked={savedOnly} onChange={(e) => setSavedOnly(e.target.checked)} />Saved places only</label>
            <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1" aria-label="Campus places">
              {shown.length === 0 ? <li><EmptyState icon={MapPin} title="No places found" description="Try a different keyword or category." /></li>
                : shown.map((l) => (
                  <li key={l.id}><div className={cn(surface, "flex items-start gap-1 pr-1", l.id === selected && "border-primary")}>
                    <button onClick={() => setSelected(l.id)} aria-pressed={l.id === selected} className="min-w-0 flex-1 rounded-2xl p-3 text-left hover:bg-hover"><p className="text-sm font-medium">{l.name}</p><p className="text-xs text-subtle">{catLabel(l.category)} · {l.landmark}</p></button>
                    <button onClick={() => toggle("place", l.id)} aria-pressed={isSaved("place", l.id)} aria-label={isSaved("place", l.id) ? `Unsave ${l.name}` : `Save ${l.name}`} className="flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-hover">{isSaved("place", l.id) ? <BookmarkCheck className="size-5 text-primary-soft" aria-hidden /> : <Bookmark className="size-5" aria-hidden />}</button></div></li>))}
            </ul>
          </div>
          <div className="order-1 flex min-w-0 flex-col gap-4 lg:order-2">
            <div className="h-[52dvh] min-h-[320px] lg:h-[480px]"><CampusMap locations={shown.length ? shown : c.locations} selectedId={selected} originId={from} destId={to} route={route} onSelect={setSelected} /></div>
            {sel && (
              <section className={`${surface} p-4`} aria-label={`Details for ${sel.name}`}>
                <div className="flex flex-wrap items-center gap-2"><h2 className="text-base font-semibold">{sel.name}</h2><StatusBadge tone="brand">{catLabel(sel.category)}</StatusBadge>{!sel.verified && <StatusBadge>Sample data</StatusBadge>}</div>
                <p className="mt-1.5 text-sm text-muted-foreground">{sel.description}</p>
                <p className="mt-1 text-xs text-subtle">Landmark: {sel.landmark}. Accessibility information: {sel.accessibility ?? "not available (unverified)"}.</p>
                <div className="mt-3 flex flex-wrap gap-2"><Button variant="outline" onClick={() => setFrom(sel.id)}>Set as start</Button><Button variant="outline" onClick={() => setTo(sel.id)}>Set as destination</Button></div>
              </section>)}
            <section className={`${surface} p-4`} aria-label="Route preview">
              <h2 className="mb-3 flex items-center gap-2 text-base font-semibold"><RouteIcon className="size-4" aria-hidden />Route preview</h2>
              <div className="grid gap-3 sm:grid-cols-2"><Select label="Start" value={from} onChange={setFrom} options={options} /><Select label="Destination" value={to} onChange={setTo} options={options} /></div>
              <div className="mt-3 text-sm" aria-live="polite">
                {!from || !to ? <p className="text-muted-foreground">Choose a start and destination to preview a route.</p>
                  : from === to ? <p className="text-muted-foreground">Start and destination are the same place.</p>
                  : !routed ? <p className="text-muted-foreground">Checking route data…</p>
                  : route ? <div className="rounded-xl border border-accent/30 bg-accent/5 p-3"><StatusBadge tone="info">Demo route</StatusBadge><p className="mt-2 text-muted-foreground">{route.note} The dashed line on the map shows the demo path. No distance, time or turn-by-turn directions are provided.</p></div>
                  : <p className="rounded-xl border border-border p-3 text-muted-foreground">No route data exists for this pair yet. Real routing needs verified campus paths, which aren&apos;t connected.</p>}
              </div>
            </section>
          </div>
        </div>)}
    </PageContainer>
  );
}
