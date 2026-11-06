"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { isActive } from "./AppSidebar";

const SHORT: Record<string, string> = { "Campus Navigation": "Campus", "Team Finder": "Teams", Dashboard: "Home", "Nova AI": "Nova" };

export function MobileBottomNav({ onMore }: { onMore: () => void }) {
  const pathname = usePathname();
  const items = NAV_ITEMS.filter((i) => i.primaryMobile);
  const cls = "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[11px]";
  return (
    <nav aria-label="Mobile" className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-sidebar/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      {items.map((i) => { const a = isActive(pathname, i.href); return (
        <Link key={i.href} href={i.href} aria-current={a ? "page" : undefined} className={cn(cls, a ? "text-foreground" : "text-subtle")}>
          <i.icon className={cn("size-5", a && "text-primary-soft")} aria-hidden />{SHORT[i.label] ?? i.label}</Link>); })}
      <button type="button" onClick={onMore} className={cn(cls, "text-subtle")}><Menu className="size-5" aria-hidden />More</button>
    </nav>
  );
}
