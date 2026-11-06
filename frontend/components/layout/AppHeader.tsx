"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { NAV_ITEMS } from "@/constants/navigation";
import { BrandMark } from "@/components/shared/BrandMark";
import { NotificationMenu } from "./NotificationMenu";
import { QuickSearch } from "./QuickSearch";
import { UserMenu } from "./UserMenu";
import { isActive } from "./AppSidebar";

export function AppHeader({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname();
  const [search, setSearch] = useState(false);
  const current = NAV_ITEMS.find((i) => isActive(pathname, i.href))?.label ?? (pathname.startsWith("/profile") ? "Profile" : "UniVerse");
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border bg-background/85 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button type="button" onClick={onMenu} aria-label="Open menu" className="-ml-2 flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-hover lg:hidden"><Menu className="size-5" aria-hidden /></button>
      <BrandMark href="/dashboard" showName={false} className="lg:hidden" />
      <p className="truncate text-sm font-medium text-muted-foreground lg:text-base">{current}</p>
      <div className="ml-auto flex items-center gap-1">
        <button type="button" onClick={() => setSearch(true)} aria-label="Search" className="hidden h-10 items-center gap-2 rounded-xl border border-border bg-elevated px-3 text-sm text-subtle hover:bg-hover sm:flex sm:w-56"><Search className="size-4" aria-hidden />Search…</button>
        <button type="button" onClick={() => setSearch(true)} aria-label="Search" className="flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-hover sm:hidden"><Search className="size-5" aria-hidden /></button>
        <NotificationMenu />
        <UserMenu />
      </div>
      <QuickSearch open={search} onOpenChange={setSearch} />
    </header>
  );
}
