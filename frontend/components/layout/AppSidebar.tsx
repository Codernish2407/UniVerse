"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GROUPS, NAV_ITEMS } from "@/constants/navigation";
import { BrandMark } from "@/components/shared/BrandMark";
import { cn } from "@/lib/utils";

export const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(href + "/");

export function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary" className="space-y-5">
      {NAV_GROUPS.map((g) => (
        <div key={g}>
          <p className="mb-1.5 px-3 text-xs font-medium text-subtle">{g}</p>
          <ul className="space-y-0.5">
            {NAV_ITEMS.filter((i) => i.group === g).map((i) => {
              const active = isActive(pathname, i.href);
              return (
                <li key={i.href}>
                  <Link href={i.href} onClick={onNavigate} aria-current={active ? "page" : undefined}
                    className={cn("flex h-11 items-center gap-3 rounded-xl px-3 text-sm transition-colors", active ? "bg-primary/15 font-medium text-foreground" : "text-muted-foreground hover:bg-hover hover:text-foreground")}>
                    <i.icon className={cn("size-[18px]", active && "text-primary-soft")} aria-hidden />{i.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col gap-6 overflow-y-auto border-r border-border bg-sidebar px-3 py-5 lg:flex">
      <BrandMark href="/dashboard" className="px-3" />
      <NavList />
    </aside>
  );
}
