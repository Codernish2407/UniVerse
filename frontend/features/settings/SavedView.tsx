"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Bookmark } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { ChipGroup } from "@/components/shared/FilterBar";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { useAsync } from "@/hooks/useAsync";
import { useSaved } from "@/hooks/useSaved";
import { campus, clubs, events, lostFound, profiles, roommates } from "@/services";
import { ACTIVE_UNIVERSITY_ID } from "@/config/activeUniversity";
import { surfaceHover } from "@/lib/ui";
import type { SavedKind } from "@/types/domain";

const KINDS: { kind: SavedKind; label: string; base: string }[] = [
  { kind: "event", label: "Events", base: "/events" }, { kind: "club", label: "Clubs", base: "/clubs" }, { kind: "lost-found", label: "Lost & Found", base: "/lost-found" },
  { kind: "student", label: "Students", base: "/team-finder" }, { kind: "roommate", label: "Roommates", base: "/roommate-finder" }, { kind: "place", label: "Places", base: "/campus-navigation" },
];

export function SavedView() {
  const { items, toggle } = useSaved();
  const { data, loading } = useAsync(async () => {
    const [ev, cl, lf, st, rm, cp] = await Promise.all([events.list(), clubs.list(), lostFound.list(), profiles.list(), roommates.list(), campus.getCampus(ACTIVE_UNIVERSITY_ID)]);
    const names = new Map<string, string>();
    ev.forEach((x) => names.set(`event:${x.id}`, x.title)); cl.forEach((x) => names.set(`club:${x.id}`, x.name)); lf.forEach((x) => names.set(`lost-found:${x.id}`, x.title));
    st.forEach((x) => names.set(`student:${x.id}`, x.name)); rm.forEach((x) => names.set(`roommate:${x.id}`, x.displayName)); cp.locations.forEach((x) => names.set(`place:${x.id}`, x.name));
    return names;
  }, []);
  const [tab, setTab] = useState("All");
  const rows = useMemo(() => items.filter((s) => tab === "All" || KINDS.find((k) => k.label === tab)?.kind === s.kind), [items, tab]);
  return (
    <PageContainer className="max-w-3xl">
      <PageHeader title="Saved" description="Everything you've bookmarked across UniVerse." />
      <div className="mb-5"><ChipGroup label="Type" options={["All", ...KINDS.map((k) => k.label)]} value={tab} onChange={setTab} /></div>
      {loading && <LoadingSkeleton count={3} className="sm:grid-cols-1 lg:grid-cols-1" />}
      {data && (rows.length === 0 ? <EmptyState icon={Bookmark} title="Nothing saved yet" description="Use the bookmark button on events, clubs, listings and places." action={<Link href="/events" className={buttonVariants({ variant: "outline" })}>Browse events</Link>} />
        : <ul className="space-y-2">{rows.map((s) => { const k = KINDS.find((x) => x.kind === s.kind)!; const name = data.get(`${s.kind}:${s.id}`) ?? "Removed item";
          const href = s.kind === "place" ? `/campus-navigation?to=${s.id}` : `${k.base}/${s.id}`;
          return <li key={`${s.kind}:${s.id}`} className={`${surfaceHover} flex items-center justify-between gap-3 p-3.5`}><Link href={href} className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{name}</p><p className="text-xs text-subtle">{k.label}</p></Link>
            <button onClick={() => toggle(s.kind, s.id)} className="h-9 rounded-lg px-3 text-sm text-muted-foreground hover:bg-background/60" aria-label={`Remove ${name} from saved`}>Remove</button></li>; })}</ul>)}
    </PageContainer>
  );
}
