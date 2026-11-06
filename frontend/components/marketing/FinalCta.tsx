import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export function FinalCta() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 text-center sm:px-12">
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
        <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">Step into your universe.</h2>
        <p className="relative mx-auto mt-3 max-w-xl text-muted-foreground">Try the full demo in seconds. No account, no backend, and nothing leaves your browser.</p>
        <div className="relative mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/signup" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-7")}>Get Started</Link><Link href="/login" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 rounded-full px-7")}>Use the demo account</Link></div>
      </div>
    </section>
  );
}
