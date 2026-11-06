import { APP_CONFIG } from "@/config/app";
export function IntroStrip() {
  return (
    <section className="border-y border-border bg-sidebar/60">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
        <p className="mx-auto max-w-3xl text-base text-muted-foreground sm:text-lg"><span className="font-medium text-foreground">{APP_CONFIG.name}</span> is a connected set of tools for university life, starting with Lovely Professional University. {APP_CONFIG.disclaimer}</p>
      </div>
    </section>
  );
}
