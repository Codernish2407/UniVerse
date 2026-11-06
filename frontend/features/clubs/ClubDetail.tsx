"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StatusBadge, SampleBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { useToast } from "@/components/shared/Toaster";
import { useAsync } from "@/hooks/useAsync";
import { useSaved } from "@/hooks/useSaved";
import { clubs, events, preferences } from "@/services";
import { formatDateTime } from "@/lib/format";
import { surface } from "@/lib/ui";

export function ClubDetail({ id }: { id: string }) {
  const { toast } = useToast();
  const { isSaved, toggle } = useSaved();
  const { data, loading, error, reload } = useAsync(async () => ({ c: await clubs.get(id), ev: (await events.list()).filter((e) => e.clubId === id), prefs: await preferences.get() }), [id]);
  if (loading) return <PageContainer><LoadingSkeleton count={2} className="sm:grid-cols-1 lg:grid-cols-1" /></PageContainer>;
  if (error) return <PageContainer><ErrorState message={error} onRetry={reload} /></PageContainer>;
  const c = data?.c;
  if (!c) return <PageContainer><EmptyState title="Club not found" action={<Link href="/clubs" className={buttonVariants({ variant: "outline" })}>Back to clubs</Link>} /></PageContainer>;
  const interested = data!.prefs.interestedClubs.includes(c.id);
  return (
    <PageContainer className="max-w-3xl">
      <PageHeader title={c.name} crumbs={[{ label: "Clubs", href: "/clubs" }, { label: c.name }]}
        actions={<><Button variant="outline" size="lg" aria-pressed={isSaved("club", c.id)} onClick={() => toggle("club", c.id)}>{isSaved("club", c.id) ? "Saved" : "Save club"}</Button>
          <Button size="lg" variant={interested ? "secondary" : "default"} onClick={async () => { const p = data!.prefs; await preferences.set({ ...p, interestedClubs: interested ? p.interestedClubs.filter((x) => x !== c.id) : [...p.interestedClubs, c.id] }); toast(interested ? "Interest removed" : "Interest saved. This is not a membership application.", "info"); reload(); }}>{interested ? "Interested ✓" : "I'm interested"}</Button></>} />
      <div className={`${surface} space-y-5 p-5`}>
        <div className="flex flex-wrap gap-2"><StatusBadge tone="brand">{c.category}</StatusBadge>{c.isSample && <SampleBadge />}</div>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{c.description}</p>
        <div><h2 className="mb-2 text-sm font-semibold">Activities</h2><ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">{c.activities.map((a) => <li key={a}>{a}</li>)}</ul></div>
        <div><h2 className="mb-2 text-sm font-semibold">Skills and interests</h2><div className="flex flex-wrap gap-1.5">{c.tags.map((t) => <StatusBadge key={t}>{t}</StatusBadge>)}</div></div>
        <p className="text-xs text-subtle">{c.contactNote} Marking interest only saves a note in this browser; it does not apply to or notify the club.</p>
      </div>
      <section className="mt-8"><SectionHeader title="Related events" />
        {data!.ev.length === 0 ? <p className="text-sm text-muted-foreground">No upcoming events from this club.</p>
          : <ul className="space-y-2">{data!.ev.map((e) => <li key={e.id}><Link href={`/events/${e.id}`} className={`${surface} block p-4 hover:bg-hover`}><p className="font-medium">{e.title}</p><p className="text-xs text-subtle">{formatDateTime(e.start)} · {e.venue}</p></Link></li>)}</ul>}</section>
    </PageContainer>
  );
}
