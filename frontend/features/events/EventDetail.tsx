"use client";
import Link from "next/link";
import { CalendarPlus, MapPin, Navigation } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge, SampleBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { useToast } from "@/components/shared/Toaster";
import { useAsync } from "@/hooks/useAsync";
import { useSaved } from "@/hooks/useSaved";
import { events, preferences, teams } from "@/services";
import { downloadIcs } from "@/lib/ics";
import { formatDateTime } from "@/lib/format";
import { surface } from "@/lib/ui";

export function EventDetail({ id }: { id: string }) {
  const { toast } = useToast();
  const { isSaved, toggle } = useSaved();
  const { data, loading, error, reload } = useAsync(async () => ({ e: await events.get(id), prefs: await preferences.get(), teams: (await teams.list()).filter((t) => t.eventId === id) }), [id]);
  if (loading) return <PageContainer><LoadingSkeleton count={2} className="sm:grid-cols-1 lg:grid-cols-1" /></PageContainer>;
  if (error) return <PageContainer><ErrorState message={error} onRetry={reload} /></PageContainer>;
  const e = data?.e;
  if (!e) return <PageContainer><EmptyState title="Event not found" action={<Link href="/events" className={buttonVariants({ variant: "outline" })}>Back to events</Link>} /></PageContainer>;
  const interested = data!.prefs.eventInterest.includes(e.id);
  return (
    <PageContainer className="max-w-3xl">
      <PageHeader title={e.title} crumbs={[{ label: "Events", href: "/events" }, { label: e.title }]}
        actions={<><Button variant="outline" size="lg" aria-pressed={isSaved("event", e.id)} onClick={() => toggle("event", e.id)}>{isSaved("event", e.id) ? "Saved" : "Save event"}</Button>
          <Button variant="outline" size="lg" onClick={() => { downloadIcs(e); toast("Calendar file downloaded"); }}><CalendarPlus aria-hidden />Add to calendar</Button></>} />
      <div className={`${surface} space-y-5 p-5`}>
        <div className="flex flex-wrap gap-2"><StatusBadge tone="brand">{e.category}</StatusBadge>{e.isSample && <SampleBadge />}</div>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{e.description}</p>
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <div><dt className="text-subtle">Starts</dt><dd className="font-medium">{formatDateTime(e.start)}</dd></div><div><dt className="text-subtle">Ends</dt><dd className="font-medium">{formatDateTime(e.end)}</dd></div>
          <div><dt className="text-subtle">Venue</dt><dd className="flex items-center gap-1.5 font-medium"><MapPin className="size-4 text-subtle" aria-hidden />{e.venue}</dd></div>
          <div><dt className="text-subtle">Organiser</dt><dd className="font-medium">{e.clubId ? <Link href={`/clubs/${e.clubId}`} className="text-primary-soft underline underline-offset-4 hover:no-underline">{e.organizer}</Link> : e.organizer}</dd></div>
        </dl>
        <div className="flex flex-wrap gap-2">
          {e.venueLocationId && <Link href={`/campus-navigation?to=${e.venueLocationId}`} className={buttonVariants({ variant: "outline", size: "lg" })}><Navigation aria-hidden />Find venue on campus map</Link>}
          <Button size="lg" variant={interested ? "secondary" : "default"} onClick={async () => { const p = data!.prefs; await preferences.set({ ...p, eventInterest: interested ? p.eventInterest.filter((x) => x !== e.id) : [...p.eventInterest, e.id] }); toast(interested ? "Interest removed" : "Interest saved. You are not registered.", "info"); reload(); }}>{interested ? "Interested ✓" : "I'm interested"}</Button>
        </div>
        <p className="text-xs text-subtle">{e.registrationNote} &quot;I&apos;m interested&quot; only saves a note in this browser.</p>
      </div>
      <section className={`${surface} mt-6 p-5`}><h2 className="mb-3 text-base font-semibold">Teams looking for members</h2>
        {data!.teams.length === 0 ? <p className="text-sm text-muted-foreground">No teams linked to this event yet. <Link href="/team-finder/create" className="text-primary-soft underline underline-offset-4 hover:no-underline">Post an opportunity</Link></p>
          : <ul className="space-y-2">{data!.teams.map((t) => <li key={t.id}><Link href={`/team-finder/${t.id}`} className="block rounded-xl p-2 hover:bg-hover"><p className="text-sm font-medium">{t.title}</p><p className="text-xs text-subtle">Needs {t.skills.join(", ")}</p></Link></li>)}</ul>}</section>
    </PageContainer>
  );
}
