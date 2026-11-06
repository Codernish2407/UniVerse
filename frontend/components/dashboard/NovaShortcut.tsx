import Link from "next/link";
import { Sparkles } from "lucide-react";

const PROMPTS = ["How can I calculate my CGPA?", "What clubs can I join?", "How do I report a lost item?"];
export function NovaShortcut() {
  return (
    <section className="rounded-2xl border border-accent/25 bg-card p-5" aria-labelledby="nova-h">
      <div className="flex items-center gap-2"><span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent"><Sparkles className="size-4" aria-hidden /></span><h2 id="nova-h" className="text-base font-semibold">Ask Nova</h2></div>
      <p className="mt-2 text-sm text-muted-foreground">Nova explains how UniVerse works. Demo mode, no AI backend connected.</p>
      <ul className="mt-3 space-y-1.5">
        {PROMPTS.map((p) => <li key={p}><Link href={`/nova?q=${encodeURIComponent(p)}`} className="block rounded-xl border border-border px-3 py-2.5 text-sm hover:bg-hover">{p}</Link></li>)}
      </ul>
    </section>
  );
}
