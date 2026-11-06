"use client";
import Link from "next/link";
import { useState } from "react";
import { Code, Briefcase, Globe } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge, SampleBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { inputCls } from "@/components/shared/FormField";
import { useToast } from "@/components/shared/Toaster";
import { useAuth } from "@/features/auth/AuthProvider";
import { useAsync } from "@/hooks/useAsync";
import { useSaved } from "@/hooks/useSaved";
import { events, profiles, teams } from "@/services";
import { formatDate } from "@/lib/format";
import { surface } from "@/lib/ui";

/** One route serves both student profiles (stu_*) and project opportunities (tm_*). */
export function TeamDetail({ id }: { id: string }) {
  const isStudent = id.startsWith("stu_");
  return isStudent ? <StudentDetail id={id} /> : <ProjectDetail id={id} />;
}

function StudentDetail({ id }: { id: string }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { isSaved, toggle } = useSaved();
  const { data: s, loading, error, reload } = useAsync(() => profiles.get(id), [id]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  if (loading) return <PageContainer><LoadingSkeleton count={2} className="lg:grid-cols-1 sm:grid-cols-1" /></PageContainer>;
  if (error) return <PageContainer><ErrorState message={error} onRetry={reload} /></PageContainer>;
  if (!s) return <PageContainer><EmptyState title="Student not found" action={<Link href="/team-finder" className={buttonVariants({ variant: "outline" })}>Back to Team Finder</Link>} /></PageContainer>;
  const links = [{ href: s.github, icon: Code, label: "GitHub" }, { href: s.linkedin, icon: Briefcase, label: "LinkedIn" }, { href: s.portfolio, icon: Globe, label: "Portfolio" }].filter((l) => l.href);
  return (
    <PageContainer className="max-w-3xl">
      <PageHeader title={s.name} crumbs={[{ label: "Team Finder", href: "/team-finder" }, { label: s.name }]} description={`${s.course} · Class of ${s.graduationYear}`}
        actions={<><Button variant="outline" size="lg" aria-pressed={isSaved("student", s.id)} onClick={() => toggle("student", s.id)}>{isSaved("student", s.id) ? "Saved" : "Save profile"}</Button>
          {s.id !== user?.id && <Button size="lg" disabled={s.availability === "unavailable"} onClick={() => setOpen(true)}>Request collaboration</Button>}</>} />
      <div className={`${surface} space-y-5 p-5`}>
        <div className="flex items-center gap-3"><UserAvatar name={s.name} className="size-14 text-lg" /><StatusBadge tone={s.availability === "open" ? "success" : s.availability === "limited" ? "warning" : "neutral"}>{s.availability === "open" ? "Open to teams" : s.availability === "limited" ? "Limited time" : "Unavailable"}</StatusBadge></div>
        {s.bio && <p className="text-sm text-muted-foreground sm:text-base">{s.bio}</p>}
        <div><h2 className="mb-2 text-sm font-semibold">Skills</h2><div className="flex flex-wrap gap-1.5">{s.skills.map((k) => <StatusBadge key={k} tone="brand">{k}</StatusBadge>)}</div></div>
        <div><h2 className="mb-2 text-sm font-semibold">Interests</h2><div className="flex flex-wrap gap-1.5">{s.interests.map((k) => <StatusBadge key={k}>{k}</StatusBadge>)}</div></div>
        {s.projectExperience.length > 0 && <div><h2 className="mb-2 text-sm font-semibold">Project experience</h2><ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">{s.projectExperience.map((p) => <li key={p}>{p}</li>)}</ul></div>}
        {s.collaborationPrefs && <div><h2 className="mb-2 text-sm font-semibold">Collaboration preferences</h2><p className="text-sm text-muted-foreground">{s.collaborationPrefs}</p></div>}
        {links.length > 0 && <div className="flex flex-wrap gap-2">{links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}><l.icon aria-hidden />{l.label}</a>)}</div>}
      </div>
      <Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>Request collaboration</DialogTitle><DialogDescription>This demo saves the request in your browser. {s.name.split(" ")[0]} will not be notified.</DialogDescription></DialogHeader>
        <label htmlFor="msg" className="sr-only">Message</label><textarea id="msg" rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} className={`${inputCls} h-auto py-2.5`} placeholder="What would you like to build together?" />
        <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={msg.trim().length < 5} onClick={() => { setOpen(false); setMsg(""); toast("Request saved (demo only, nobody was notified)", "info"); }}>Save request</Button></DialogFooter></DialogContent></Dialog>
    </PageContainer>
  );
}

function ProjectDetail({ id }: { id: string }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data, loading, error, reload } = useAsync(async () => { const t = await teams.get(id); return { t, ev: t?.eventId ? await events.get(t.eventId) : undefined }; }, [id]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  if (loading) return <PageContainer><LoadingSkeleton count={2} className="lg:grid-cols-1 sm:grid-cols-1" /></PageContainer>;
  if (error) return <PageContainer><ErrorState message={error} onRetry={reload} /></PageContainer>;
  const t = data?.t;
  if (!t || !user) return <PageContainer><EmptyState title="Project not found" action={<Link href="/team-finder" className={buttonVariants({ variant: "outline" })}>Back to Team Finder</Link>} /></PageContainer>;
  const mine = t.ownerId === user.id;
  const applied = t.applicants.some((a) => a.studentId === user.id);
  return (
    <PageContainer className="max-w-3xl">
      <PageHeader title={t.title} crumbs={[{ label: "Team Finder", href: "/team-finder" }, { label: t.title }]} description={`Posted by ${t.ownerName} on ${formatDate(t.createdAt)}`} />
      <div className={`${surface} space-y-5 p-5`}>
        <div className="flex flex-wrap gap-2"><StatusBadge tone="brand">{t.category}</StatusBadge><StatusBadge>Team of {t.teamSize}</StatusBadge><StatusBadge>{t.mode}</StatusBadge>{t.status === "closed" && <StatusBadge>Closed</StatusBadge>}{t.isSample && <SampleBadge />}</div>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{t.description}</p>
        <div><h2 className="mb-2 text-sm font-semibold">Skills needed</h2><div className="flex flex-wrap gap-1.5">{t.skills.map((k) => <StatusBadge key={k}>{k}</StatusBadge>)}</div></div>
        {data?.ev && <p className="text-sm">Related event: <Link href={`/events/${data.ev.id}`} className="text-primary-soft underline underline-offset-4 hover:no-underline">{data.ev.title}</Link></p>}
        {!mine && <Button size="lg" disabled={applied || t.status === "closed"} onClick={() => setOpen(true)}>{applied ? "Application saved (demo)" : "Apply to join"}</Button>}
        {mine && <p className="text-sm text-muted-foreground">This is your opportunity.</p>}
      </div>
      {mine && <section className={`${surface} mt-6 p-5`}><h2 className="mb-3 text-base font-semibold">Applicants ({t.applicants.length})</h2>
        {t.applicants.length === 0 ? <p className="text-sm text-muted-foreground">No applications yet.</p> : <ul className="space-y-3">{t.applicants.map((a) => <li key={a.at} className="flex gap-3"><UserAvatar name={a.name} /><div><p className="text-sm font-medium">{a.name}</p><p className="text-sm text-muted-foreground">{a.message}</p></div></li>)}</ul>}</section>}
      <Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>Apply to join</DialogTitle><DialogDescription>Your application updates the demo state in this browser. The owner is not notified.</DialogDescription></DialogHeader>
        <label htmlFor="amsg" className="sr-only">Message</label><textarea id="amsg" rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} className={`${inputCls} h-auto py-2.5`} placeholder="Tell them what you can contribute" />
        <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={msg.trim().length < 5} onClick={async () => { await teams.apply(t.id, { id: user.id, name: user.name }, msg.trim()); setOpen(false); setMsg(""); toast("Application saved (demo only)"); reload(); }}>Submit application</Button></DialogFooter></DialogContent></Dialog>
    </PageContainer>
  );
}
