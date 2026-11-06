"use client";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge, SampleBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useToast } from "@/components/shared/Toaster";
import { useAuth } from "@/features/auth/AuthProvider";
import { useAsync } from "@/hooks/useAsync";
import { useSaved } from "@/hooks/useSaved";
import { roommates } from "@/services";
import { scoreCompatibility } from "@/lib/compatibility";
import { rupees } from "@/lib/format";
import { surface } from "@/lib/ui";

export function RoommateDetail({ id }: { id: string }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { isSaved, toggle } = useSaved();
  const { data, loading, error, reload } = useAsync(async () => ({ all: await roommates.list() }), [id]);
  if (loading) return <PageContainer><LoadingSkeleton count={2} className="sm:grid-cols-1 lg:grid-cols-1" /></PageContainer>;
  if (error) return <PageContainer><ErrorState message={error} onRetry={reload} /></PageContainer>;
  const r = data?.all.find((x) => x.id === id);
  if (!r || !user) return <PageContainer><EmptyState title="Listing not found" action={<Link href="/roommate-finder" className={buttonVariants({ variant: "outline" })}>Back to Roommate Finder</Link>} /></PageContainer>;
  const mine = data!.all.find((x) => x.ownerId === user.id);
  const isMine = r.ownerId === user.id;
  const compat = mine && !isMine ? scoreCompatibility(mine, r) : null;
  const requested = r.connectionRequests.some((c) => c.studentId === user.id);
  return (
    <PageContainer className="max-w-3xl">
      <PageHeader title={r.displayName} crumbs={[{ label: "Roommate Finder", href: "/roommate-finder" }, { label: r.displayName }]} description={`${r.course} · ${r.accommodation}`}
        actions={<><Button variant="outline" size="lg" aria-pressed={isSaved("roommate", r.id)} onClick={() => toggle("roommate", r.id)}>{isSaved("roommate", r.id) ? "Saved" : "Save"}</Button>
          {isMine ? <Link href="/roommate-finder/create" className={buttonVariants({ size: "lg" })}>Edit preferences</Link>
            : <Button size="lg" disabled={requested || !r.available} onClick={async () => { await roommates.requestConnection(r.id, { id: user.id, name: user.name }); toast("Request saved (demo only, nobody was notified)", "info"); reload(); }}>{requested ? "Request saved (demo)" : "Request connection"}</Button>}</>} />
      <div className={`${surface} space-y-5 p-5`}>
        <div className="flex items-center gap-3"><UserAvatar name={r.displayName} className="size-14 text-lg" />{r.available ? <StatusBadge tone="success">Looking now</StatusBadge> : <StatusBadge>Not looking</StatusBadge>}{r.isSample && <SampleBadge />}</div>
        <p className="text-sm text-muted-foreground sm:text-base">{r.about}</p>
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          {[["Budget", `${rupees(r.budgetMin)}–${rupees(r.budgetMax)} per month`], ["Sleep schedule", r.sleep], ["Study habits", r.study], ["Room sharing", r.sharing], ["Cleanliness", `${r.cleanliness} of 5`]].map(([k, v]) => <div key={k}><dt className="text-subtle">{k}</dt><dd className="font-medium">{v}</dd></div>)}
        </dl>
        <div className="flex flex-wrap gap-1.5">{r.lifestyle.map((l) => <StatusBadge key={l}>{l}</StatusBadge>)}</div>
        <p className="text-xs text-subtle">Private details like phone numbers and room numbers are not shown. Messaging needs the real backend.</p>
      </div>
      <section className={`${surface} mt-6 p-5`} aria-labelledby="compat">
        <h2 id="compat" className="text-base font-semibold">Compatibility</h2>
        {isMine ? <p className="mt-2 text-sm text-muted-foreground">This is your listing.</p>
          : !compat ? <p className="mt-2 text-sm text-muted-foreground">Create your own listing to compare preferences. <Link href="/roommate-finder/create" className="text-primary-soft underline underline-offset-4 hover:no-underline">Create listing</Link></p>
          : <>
            <p className="mt-2 text-3xl font-semibold">{compat.score}%</p>
            <p className="text-xs text-subtle">A rule-based comparison of stated preferences, not a validated prediction.</p>
            <ul className="mt-4 space-y-2.5">{compat.factors.map((c) => (
              <li key={c.label} className="flex items-start gap-3 text-sm">{c.points >= c.max * 0.6 ? <Check className="mt-0.5 size-4 shrink-0 text-success" aria-label="Good match" /> : <Minus className="mt-0.5 size-4 shrink-0 text-warning" aria-label="Weaker match" />}
                <div className="flex-1"><div className="flex justify-between gap-2"><span className="font-medium">{c.label}</span><span className="text-subtle">{c.points}/{c.max}</span></div><p className="text-muted-foreground">{c.detail}</p></div></li>))}</ul></>}
      </section>
    </PageContainer>
  );
}
