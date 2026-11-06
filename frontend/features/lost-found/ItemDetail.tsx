"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Calendar, Flag, MapPin, ShieldCheck } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge, SampleBadge } from "@/components/shared/StatusBadge";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useToast } from "@/components/shared/Toaster";
import { useAuth } from "@/features/auth/AuthProvider";
import { useAsync } from "@/hooks/useAsync";
import { useSaved } from "@/hooks/useSaved";
import { lostFound } from "@/services";
import { formatDate } from "@/lib/format";
import { surface } from "@/lib/ui";
import { inputCls } from "@/components/shared/FormField";

export function ItemDetail({ id }: { id: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const { isSaved, toggle } = useSaved();
  const { data, loading, error, reload } = useAsync(async () => ({ item: await lostFound.get(id), all: await lostFound.list() }), [id]);
  const [claimOpen, setClaimOpen] = useState(false);
  const [note, setNote] = useState("");
  const [confirm, setConfirm] = useState<"close" | "delete" | null>(null);

  if (loading) return <PageContainer><LoadingSkeleton count={2} className="sm:grid-cols-1 lg:grid-cols-1" /></PageContainer>;
  if (error) return <PageContainer><ErrorState message={error} onRetry={reload} /></PageContainer>;
  const item = data?.item;
  if (!item || !user) return <PageContainer><EmptyState title="Listing not found" description="It may have been deleted." action={<Link href="/lost-found" className={buttonVariants({ variant: "outline" })}>Back to Lost & Found</Link>} /></PageContainer>;
  const mine = item.ownerId === user.id;
  const alreadyRequested = item.ownershipRequests.some((r) => r.studentId === user.id);
  const related = (data?.all ?? []).filter((x) => x.id !== item.id && x.category === item.category).slice(0, 3);

  return (
    <PageContainer className="max-w-4xl">
      <PageHeader title={item.title} crumbs={[{ label: "Lost & Found", href: "/lost-found" }, { label: item.title }]}
        actions={<Button variant="outline" size="lg" aria-pressed={isSaved("lost-found", item.id)} onClick={() => toggle("lost-found", item.id)}>{isSaved("lost-found", item.id) ? "Saved" : "Save"}</Button>} />
      <div className="grid gap-6 md:grid-cols-3">
        <div className={`${surface} space-y-4 p-5 md:col-span-2`}>
          {item.imageDataUrl && <img src={item.imageDataUrl} alt={`Photo of ${item.title}`} className="max-h-72 w-full rounded-xl object-cover" />}
          <div className="flex flex-wrap gap-2"><StatusBadge tone={item.kind === "lost" ? "warning" : "success"}>{item.kind === "lost" ? "Lost" : "Found"}</StatusBadge><StatusBadge tone={item.status === "open" ? "info" : "neutral"}>{item.status === "open" ? "Open" : "Closed"}</StatusBadge><StatusBadge>{item.category}</StatusBadge>{item.isSample && <SampleBadge />}</div>
          <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground sm:text-base">{item.description}</p>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="flex items-center gap-2"><MapPin className="size-4 text-subtle" aria-hidden /><dt className="sr-only">Location</dt><dd>{item.location}</dd></div>
            <div className="flex items-center gap-2"><Calendar className="size-4 text-subtle" aria-hidden /><dt className="sr-only">Date</dt><dd>{formatDate(item.date)}</dd></div>
          </dl>
          <p className="text-xs text-subtle">Posted by {item.ownerName}. Contact details are not shown publicly.</p>
        </div>
        <aside className="space-y-4">
          <div className={`${surface} space-y-3 p-5`}>
            {mine ? (<>
              <p className="text-sm font-medium">This is your listing</p>
              <Link href={`/lost-found/create?edit=${item.id}`} className={buttonVariants({ variant: "outline", size: "lg", className: "w-full" })}>Edit listing</Link>
              <Button variant="outline" size="lg" className="w-full" onClick={() => (item.status === "open" ? setConfirm("close") : lostFound.update(item.id, { status: "open" }).then(() => { toast("Listing reopened"); reload(); }))}>{item.status === "open" ? "Close listing" : "Reopen listing"}</Button>
              <Button variant="destructive" size="lg" className="w-full" onClick={() => setConfirm("delete")}>Delete listing</Button>
            </>) : (<>
              <Button size="lg" className="w-full" disabled={item.status === "closed" || alreadyRequested} onClick={() => setClaimOpen(true)}>{alreadyRequested ? "Request sent (demo)" : item.kind === "found" ? "Request ownership" : "I found this item"}</Button>
              <Button variant="ghost" size="lg" className="w-full" disabled={item.reported} onClick={async () => { await lostFound.report(item.id); toast("Thanks, the listing was reported (demo)"); reload(); }}><Flag aria-hidden />{item.reported ? "Reported" : "Report listing"}</Button>
            </>)}
            <p className="flex gap-2 text-xs text-subtle"><ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />Ownership verification and secure messaging are future backend features. Requests here are saved in this browser only.</p>
          </div>
          {mine && item.ownershipRequests.length > 0 && <div className={`${surface} p-5`}><p className="mb-2 text-sm font-medium">Requests (demo)</p><ul className="space-y-2 text-sm">{item.ownershipRequests.map((r) => <li key={r.at}><span className="font-medium">{r.name}</span><span className="block text-xs text-muted-foreground">{r.note}</span></li>)}</ul></div>}
        </aside>
      </div>
      {related.length > 0 && <section className="mt-8"><SectionHeader title={`More in ${item.category}`} /><ul className="grid gap-3 sm:grid-cols-3">{related.map((r) => <li key={r.id}><Link href={`/lost-found/${r.id}`} className={`${surface} block p-4 hover:bg-hover`}><p className="text-sm font-medium">{r.title}</p><p className="text-xs text-subtle">{r.location}</p></Link></li>)}</ul></section>}

      <Dialog open={claimOpen} onOpenChange={setClaimOpen}>
        <DialogContent><DialogHeader><DialogTitle>{item.kind === "found" ? "Request ownership" : "Tell the owner you found it"}</DialogTitle><DialogDescription>Add a detail only the real owner would know. This request is stored in your browser for the demo and is not delivered to anyone.</DialogDescription></DialogHeader>
          <label htmlFor="note" className="sr-only">Message</label><textarea id="note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} className={`${inputCls} h-auto py-2.5`} placeholder="Describe a unique detail…" />
          <DialogFooter><Button variant="outline" onClick={() => setClaimOpen(false)}>Cancel</Button>
            <Button disabled={note.trim().length < 5} onClick={async () => { await lostFound.requestOwnership(item.id, { id: user.id, name: user.name }, note.trim()); setClaimOpen(false); setNote(""); toast("Request saved (demo only)"); reload(); }}>Send request</Button></DialogFooter></DialogContent>
      </Dialog>
      <ConfirmationDialog open={confirm === "close"} onOpenChange={(o) => !o && setConfirm(null)} title="Close this listing?" description="It will be hidden from the default list. You can reopen it later." confirmLabel="Close listing" onConfirm={async () => { await lostFound.update(item.id, { status: "closed" }); toast("Listing closed"); reload(); }} />
      <ConfirmationDialog open={confirm === "delete"} onOpenChange={(o) => !o && setConfirm(null)} title="Delete this listing?" description="This permanently removes the listing from your demo data." confirmLabel="Delete" destructive onConfirm={async () => { await lostFound.remove(item.id); toast("Listing deleted"); router.replace("/lost-found"); }} />
    </PageContainer>
  );
}
