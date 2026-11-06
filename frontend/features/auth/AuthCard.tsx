import { BrandMark } from "@/components/shared/BrandMark";
import { APP_CONFIG } from "@/config/app";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function AuthCard({ title, subtitle, children, footer }: { title: string; subtitle: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-10">
      <div aria-hidden className="pointer-events-none absolute top-[-20%] left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      <div className="relative w-full max-w-md">
        <BrandMark className="mb-8 justify-center" />
        <div className="rounded-3xl border border-border bg-card/90 p-6 shadow-2xl shadow-black/40 sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
        {footer && <p className="mt-5 text-center text-sm text-muted-foreground">{footer}</p>}
        <div className="mt-6 flex flex-col items-center gap-2 text-center text-xs text-subtle">
          <StatusBadge tone="info">Demo mode</StatusBadge>
          <p className="max-w-xs">{APP_CONFIG.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
