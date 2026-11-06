import { cn } from "@/lib/utils";
export function MarketingSection({ id, eyebrow, title, intro, children, className }: { id?: string; eyebrow?: string; title: string; intro?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8", className)}>
      <div className="mb-10 max-w-2xl">
        {eyebrow && <p className="mb-2 text-sm font-medium text-secondary-soft">{eyebrow}</p>}
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {intro && <p className="mt-3 text-base text-muted-foreground sm:text-lg">{intro}</p>}
      </div>
      {children}
    </section>
  );
}
