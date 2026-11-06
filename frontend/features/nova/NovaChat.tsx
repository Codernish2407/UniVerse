"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Copy, History, Plus, Send, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { nova } from "@/services";
import { makeId } from "@/services/mock/collection";
import { formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ChatMessage, Conversation } from "@/types/domain";

const SUGGESTED = ["How can I calculate my CGPA?", "Help me find a teammate for a hackathon.", "Where can I explore campus facilities?", "What clubs can I join?", "How do I report a lost item?"];
const newConvo = (): Conversation => ({ id: makeId("cv"), title: "New conversation", messages: [], updatedAt: new Date().toISOString() });

function History_({ list, activeId, onPick, onNew }: { list: Conversation[]; activeId: string; onPick: (id: string) => void; onNew: () => void }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <Button variant="outline" size="lg" onClick={onNew}><Plus aria-hidden />New conversation</Button>
      <ul className="flex-1 space-y-1 overflow-y-auto">
        {list.map((c) => <li key={c.id}><button onClick={() => onPick(c.id)} aria-current={c.id === activeId} className={cn("w-full truncate rounded-xl px-3 py-2.5 text-left text-sm", c.id === activeId ? "bg-primary/15" : "text-muted-foreground hover:bg-hover")}>{c.title}</button></li>)}
      </ul>
    </div>
  );
}

export function NovaChat() {
  const [convos, setConvos] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState("");
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const seeded = useRef(false);
  const q = useSearchParams().get("q");

  const persist = useCallback((next: Conversation[]) => { setConvos(next); void nova.saveConversations(next); }, []);
  const active = convos.find((c) => c.id === activeId);

  const send = useCallback(async (text: string, base?: Conversation[], id?: string) => {
    const clean = text.trim(); if (!clean || pending) return;
    let list = base ?? convos; let cid = id ?? activeId;
    if (!list.some((c) => c.id === cid)) { const n = newConvo(); list = [n, ...list]; cid = n.id; setActiveId(cid); }
    const userMsg: ChatMessage = { id: makeId("msg"), role: "user", text: clean, at: new Date().toISOString() };
    const withUser = list.map((c) => (c.id === cid ? { ...c, title: c.messages.length ? c.title : clean.slice(0, 40), messages: [...c.messages, userMsg], updatedAt: userMsg.at } : c));
    persist(withUser); setInput(""); setPending(true);
    const history = withUser.find((c) => c.id === cid)!.messages;
    const reply = await nova.ask(clean, history);
    persist(withUser.map((c) => (c.id === cid ? { ...c, messages: [...c.messages, reply], updatedAt: reply.at } : c)));
    setPending(false);
  }, [convos, activeId, pending, persist]);

  useEffect(() => {
    void nova.listConversations().then((list) => {
      const init = list.length ? list : [newConvo()];
      setConvos(init); setActiveId(init[0].id);
      if (q && !seeded.current) { seeded.current = true; void send(q, init, init[0].id); }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [active?.messages.length, pending]);

  const startNew = () => { const n = newConvo(); persist([n, ...convos.filter((c) => c.messages.length)]); setActiveId(n.id); setHistoryOpen(false); };
  const empty = !active || active.messages.length === 0;

  return (
    <div className="flex h-[calc(100dvh-4rem-3.5rem-env(safe-area-inset-bottom))] lg:h-[calc(100dvh-4rem)]">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar/60 p-3 md:block"><History_ list={convos} activeId={activeId} onPick={setActiveId} onNew={startNew} /></aside>
      <section className="flex min-w-0 flex-1 flex-col" aria-label="Conversation with Nova">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setHistoryOpen(true)} aria-label="Conversation history"><History aria-hidden /></Button>
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent"><Sparkles className="size-4" aria-hidden /></span>
          <div className="min-w-0 flex-1"><p className="text-sm font-medium">Nova</p><p className="text-xs text-subtle">UniVerse assistant</p></div>
          <StatusBadge tone="info">Demo mode</StatusBadge>
          <Button variant="ghost" size="icon" onClick={startNew} aria-label="New conversation" className="md:hidden"><Plus aria-hidden /></Button>
          <Button variant="ghost" size="icon" disabled={empty} onClick={() => setConfirmClear(true)} aria-label="Clear conversation"><Trash2 aria-hidden /></Button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {empty ? (
            <div className="mx-auto flex max-w-xl flex-col items-center pt-6 text-center sm:pt-14">
              <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-accent/15 text-accent"><Sparkles className="size-6" aria-hidden /></span>
              <h1 className="text-2xl font-semibold tracking-tight">How can I help?</h1>
              <p className="mt-2 text-sm text-muted-foreground">I&apos;m running in demo mode with prepared answers about UniVerse. No AI backend is connected, so I can&apos;t answer open-ended questions yet.</p>
              <ul className="mt-6 grid w-full gap-2">{SUGGESTED.map((s) => <li key={s}><button onClick={() => send(s)} className="w-full rounded-xl border border-border px-4 py-3 text-left text-sm hover:bg-hover">{s}</button></li>)}</ul>
            </div>
          ) : (
            <ol className="mx-auto max-w-2xl space-y-5">
              {active.messages.map((m) => (
                <li key={m.id} className={cn("flex flex-col", m.role === "user" ? "items-end" : "items-start")}>
                  <div className={cn("max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed", m.role === "user" ? "bg-primary-strong text-primary-foreground" : "border border-border bg-card")}>
                    <p className="whitespace-pre-line">{m.text}</p>
                    {m.links && <div className="mt-3 flex flex-wrap gap-2">{m.links.map((l) => <Link key={l.href} href={l.href} className="rounded-lg bg-hover px-3 py-1.5 text-xs font-medium text-foreground hover:bg-border">{l.label}</Link>)}</div>}
                  </div>
                  <div className="mt-1 flex items-center gap-2 px-1 text-xs text-subtle"><time dateTime={m.at}>{formatTime(m.at)}</time>
                    {m.role === "nova" && <button className="flex min-h-8 items-center gap-1 hover:text-foreground" aria-label="Copy response" onClick={async () => { await navigator.clipboard?.writeText(m.text); setCopied(m.id); setTimeout(() => setCopied(null), 1500); }}>{copied === m.id ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}{copied === m.id ? "Copied" : "Copy"}</button>}</div>
                </li>))}
              {pending && <li role="status" aria-label="Nova is typing" className="flex items-center gap-1.5 px-2">{[0, 1, 2].map((i) => <span key={i} className="size-2 animate-bounce rounded-full bg-accent/70 motion-reduce:animate-none" style={{ animationDelay: `${i * 120}ms` }} />)}</li>}
              <div ref={endRef} />
            </ol>)}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); void send(input); }} className="border-t border-border bg-background px-4 py-3">
          <div className="mx-auto flex max-w-2xl items-end gap-2">
            <label htmlFor="nova-input" className="sr-only">Message Nova</label>
            <textarea id="nova-input" rows={1} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(input); } }} placeholder="Ask about UniVerse…" className="max-h-32 min-h-11 flex-1 resize-none rounded-xl border border-input bg-elevated px-3 py-2.5 text-sm outline-none placeholder:text-subtle focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40" />
            <Button type="submit" size="icon-lg" disabled={!input.trim() || pending} aria-label="Send message"><Send aria-hidden /></Button>
          </div>
        </form>
      </section>
      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}><DialogContent className="top-0 left-0 h-dvh max-h-dvh max-w-[85%] translate-x-0 translate-y-0 rounded-none sm:max-w-xs"><DialogTitle>Conversations</DialogTitle><DialogDescription className="sr-only">Pick a past conversation</DialogDescription>
        <History_ list={convos} activeId={activeId} onPick={(id) => { setActiveId(id); setHistoryOpen(false); }} onNew={startNew} /></DialogContent></Dialog>
      <ConfirmationDialog open={confirmClear} onOpenChange={setConfirmClear} title="Clear this conversation?" description="Its messages will be removed from this device." confirmLabel="Clear" destructive onConfirm={() => persist(convos.map((c) => (c.id === activeId ? { ...c, title: "New conversation", messages: [] } : c)))} />
    </div>
  );
}
