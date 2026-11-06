import Link from "next/link";
import { Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { MarketingSection } from "./MarketingSection";

export function NovaIntro() {
  return (
    <MarketingSection id="nova" eyebrow="Nova AI" title="A guide to everything in UniVerse.">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div><p className="text-muted-foreground sm:text-lg">Nova explains how each module works and points you to the right page. Today it runs in clearly labelled demo mode with prepared answers. The service is built so a real AI backend can be connected later without changing the interface.</p>
          <Link href="/signup" className={`${buttonVariants({ size: "lg" })} mt-6`}>Try the demo</Link></div>
        <div className="rounded-2xl border border-accent/25 bg-card p-5" aria-label="Example Nova conversation">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium"><span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent"><Sparkles className="size-4" aria-hidden /></span>Nova<span className="rounded-full border border-accent/40 px-2 py-0.5 text-xs text-accent">Demo mode</span></div>
          <p className="ml-auto w-fit max-w-[85%] rounded-2xl bg-primary-strong px-4 py-2.5 text-sm text-primary-foreground">How do I report a lost item?</p>
          <p className="mt-3 max-w-[90%] rounded-2xl border border-border bg-elevated px-4 py-2.5 text-sm text-muted-foreground">Open Lost &amp; Found, choose Create listing, and describe the item and where it was last seen. Avoid adding phone numbers to the description.</p>
        </div>
      </div>
    </MarketingSection>
  );
}
