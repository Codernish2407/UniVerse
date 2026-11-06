"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/AuthProvider";
import { Skeleton } from "@/components/shared/LoadingSkeleton";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { MobileMenu } from "./MobileMenu";

/** Authenticated layout + demo route guard (client-side only; not real security). */
export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  useEffect(() => { if (!loading && !user) router.replace(`/login?next=${encodeURIComponent(pathname)}`); }, [loading, user, router, pathname]);
  if (loading || !user) return <div className="p-8"><Skeleton className="h-10 w-48" /><Skeleton className="mt-6 h-64" /></div>;
  return (
    <div className="flex min-h-dvh">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader onMenu={() => setMenu(true)} />
        <main id="main" className="flex-1 pb-20 lg:pb-0">{children}</main>
      </div>
      <MobileBottomNav onMore={() => setMenu(true)} />
      <MobileMenu open={menu} onOpenChange={setMenu} />
    </div>
  );
}
