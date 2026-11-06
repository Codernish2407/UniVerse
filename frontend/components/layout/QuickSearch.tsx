"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { NAV_ITEMS } from "@/constants/navigation";
import { clubs, events, lostFound } from "@/services";
import { matchesQuery } from "@/lib/format";

interface Hit { label: string; href: string; kind: string }

/** Header search: jumps to modules and searches clubs, events and lost-and-found titles. */
export function QuickSearch({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<Hit[]>([]);
  useEffect(() => {
    if (!open) return;
    void Promise.all([clubs.list(), events.list(), lostFound.list()]).then(([c, e, l]) => setIndex([
      ...c.map((x) => ({ label: x.name, href: `/clubs/${x.id}`, kind: "Club" })),
      ...e.map((x) => ({ label: x.title, href: `/events/${x.id}`, kind: "Event" })),
      ...l.map((x) => ({ label: x.title, href: `/lost-found/${x.id}`, kind: "Lost & Found" })),
    ]));
  }, [open]);
  const hits: Hit[] = [
    ...NAV_ITEMS.map((n) => ({ label: n.label, href: n.href, kind: "Go to" })),
    ...index,
  ].filter((h) => matchesQuery(q, h.label)).slice(0, 8);
  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) setQ(""); }}>
      <DialogContent className="top-[15%] translate-y-0 sm:max-w-lg" showCloseButton={false}>
        <DialogTitle className="sr-only">Search UniVerse</DialogTitle>
        <DialogDescription className="sr-only">Search modules, clubs, events and listings</DialogDescription>
        <div className="relative"><Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" aria-hidden />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" placeholder="Search modules, clubs, events…" className="h-11 w-full rounded-xl border border-input bg-elevated pr-3 pl-9 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40" /></div>
        <ul className="max-h-72 space-y-0.5 overflow-y-auto">
          {hits.map((h) => <li key={h.href}><Link href={h.href} onClick={() => onOpenChange(false)} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-hover"><span className="truncate">{h.label}</span><span className="shrink-0 text-xs text-subtle">{h.kind}</span></Link></li>)}
          {hits.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted-foreground">No matches for “{q}”.</li>}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
