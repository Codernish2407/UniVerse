"use client";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { EmptyState } from "@/components/shared/EmptyState";
import { useAuth } from "@/features/auth/AuthProvider";
import { useAsync } from "@/hooks/useAsync";
import { academics, clubs, events, lostFound, profiles, teams } from "@/services";
import { computeCgpa } from "@/lib/cgpa";
import { ACTIVE_UNIVERSITY } from "@/config/activeUniversity";
import { upcomingFirst } from "@/lib/events";
import { formatDateTime, greetingFor } from "@/lib/format";
import { surface, surfaceHover } from "@/lib/ui";
import { AcademicOverview } from "./AcademicOverview";
import { CampusNavCard } from "./CampusNavCard";
import { NovaShortcut } from "./NovaShortcut";
import { QuickActions } from "./QuickActions";

export function DashboardView() {
  const { user } = useAuth();
  const { data, loading, error, reload } = useAsync(async () => {
    const [ev, cl, lf, tm, st, sem] = await Promise.all([events.list(), clubs.list(), lostFound.list(), teams.list(), profiles.list(), academics.list()]);
    return { ev, cl, lf, tm, st, sem };
  }, []);
  if (!user) return null;
  const hour = new Date().getHours();

  return (
    <PageContainer>
      <div className="mb-6"><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{greetingFor(hour)}, {user.name.split(" ")[0]}.</h1>
        <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">Here&apos;s what&apos;s happening across your campus today.</p></div>
      <QuickActions />
      {loading && <LoadingSkeleton className="mt-6" count={3} />}
      {error && <div className="mt-6"><ErrorState message={error} onRetry={reload} /></div>}
      {data && (() => {
        const cgpa = computeCgpa(data.sem, ACTIVE_UNIVERSITY.gradeScale).cgpa;
        const upcoming = upcomingFirst(data.ev).slice(0, 3);
        const needed = new Set(data.tm.filter((t) => t.status === "open").flatMap((t) => t.skills.map((s) => s.toLowerCase())));
        const recommended = data.st.filter((s) => s.id !== user.id && s.availability !== "unavailable")
          .map((s) => ({ s, n: s.skills.filter((k) => needed.has(k.toLowerCase())).length })).sort((a, b) => b.n - a.n).slice(0, 3);
        const featuredClubs = data.cl.filter((c) => c.featured).slice(0, 3);
        const lost = data.lf.filter((i) => i.status === "open").slice(0, 3);
        const projects = data.tm.filter((t) => t.status === "open").slice(0, 3);
        return (
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <AcademicOverview cgpa={cgpa} savedSemesters={data.sem.length} semester={user.semester} course={user.course} />
              <section aria-labelledby="ev-h"><SectionHeader title="Upcoming events" href="/events" />
                <h2 id="ev-h" className="sr-only">Upcoming events</h2>
                {upcoming.length === 0 ? <EmptyState icon={CalendarDays} title="No events yet" /> : (
                  <ul className="grid gap-3 sm:grid-cols-3">{upcoming.map((e) => (
                    <li key={e.id}><Link href={`/events/${e.id}`} className={`${surfaceHover} flex h-full flex-col gap-2 p-4`}>
                      <StatusBadge tone="brand" className="self-start">{e.category}</StatusBadge><p className="font-medium">{e.title}</p><p className="mt-auto text-xs text-subtle">{formatDateTime(e.start)} · {e.venue}</p></Link></li>))}</ul>)}
              </section>
              <section><SectionHeader title="Recent lost & found" href="/lost-found" />
                <ul className="space-y-2">{lost.map((i) => (
                  <li key={i.id}><Link href={`/lost-found/${i.id}`} className={`${surfaceHover} flex items-center justify-between gap-3 p-3.5`}>
                    <div className="min-w-0"><p className="truncate text-sm font-medium">{i.title}</p><p className="truncate text-xs text-subtle">{i.location}</p></div>
                    <StatusBadge tone={i.kind === "lost" ? "warning" : "success"}>{i.kind === "lost" ? "Lost" : "Found"}</StatusBadge></Link></li>))}</ul>
              </section>
              <section><SectionHeader title="Featured clubs" href="/clubs" />
                <ul className="grid gap-3 sm:grid-cols-3">{featuredClubs.map((c) => (
                  <li key={c.id}><Link href={`/clubs/${c.id}`} className={`${surfaceHover} block h-full p-4`}><p className="font-medium">{c.name}</p><p className="mt-1 text-xs text-subtle">{c.category}</p></Link></li>))}</ul>
              </section>
            </div>
            <div className="space-y-6">
              <CampusNavCard />
              <NovaShortcut />
              <section className={`${surface} p-4`}><SectionHeader title="Recommended teammates" href="/team-finder" />
                <ul className="space-y-1">{recommended.map(({ s }) => (
                  <li key={s.id}><Link href={`/team-finder/${s.id}`} className="flex items-center gap-3 rounded-xl p-2 hover:bg-hover"><UserAvatar name={s.name} />
                    <div className="min-w-0"><p className="truncate text-sm font-medium">{s.name}</p><p className="truncate text-xs text-subtle">{s.skills.slice(0, 3).join(", ")}</p></div></Link></li>))}</ul>
              </section>
              <section className={`${surface} p-4`}><SectionHeader title="Open projects" href="/team-finder" />
                <ul className="space-y-1">{projects.map((t) => (
                  <li key={t.id}><Link href={`/team-finder/${t.id}`} className="block rounded-xl p-2 hover:bg-hover"><p className="text-sm font-medium">{t.title}</p><p className="text-xs text-subtle">{t.category} · {t.skills.slice(0, 2).join(", ")}</p></Link></li>))}</ul>
              </section>
            </div>
          </div>
        );
      })()}
    </PageContainer>
  );
}
