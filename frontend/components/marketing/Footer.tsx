import Link from "next/link";
import { APP_CONFIG } from "@/config/app";
import { FEATURES } from "@/constants/features";
import { BrandMark } from "@/components/shared/BrandMark";

export function Footer() {
  const col = "space-y-2 text-sm text-muted-foreground";
  const a = "hover:text-foreground";
  return (
    <footer className="border-t border-border bg-sidebar">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2"><BrandMark /><p className="mt-3 max-w-sm text-sm text-muted-foreground">{APP_CONFIG.tagline}</p><p className="mt-3 max-w-sm text-xs text-subtle">{APP_CONFIG.disclaimer}</p></div>
        <nav aria-label="Modules"><p className="mb-3 text-sm font-medium">Modules</p><ul className={col}>{FEATURES.slice(0, 4).map((f) => <li key={f.id}><Link href="/login" className={a}>{f.title}</Link></li>)}</ul></nav>
        <nav aria-label="Product"><p className="mb-3 text-sm font-medium">Product</p><ul className={col}><li><Link href="/features" className={a}>Features</Link></li><li><Link href="/about" className={a}>About</Link></li><li><Link href="/login" className={a}>Login</Link></li><li><Link href="/signup" className={a}>Sign up</Link></li>
          {APP_CONFIG.githubUrl && <li><a href={APP_CONFIG.githubUrl} target="_blank" rel="noopener noreferrer" className={a}>GitHub</a></li>}</ul></nav>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-subtle">© {new Date().getFullYear()} {APP_CONFIG.name}. Demo build with sample data.</div>
    </footer>
  );
}
