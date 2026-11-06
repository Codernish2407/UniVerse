"use client";
import type { JSX } from "react";
import { createElement, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Calculator, CalendarDays, Compass, Home, LayoutDashboard, Map, Menu, Orbit, PackageSearch, Search, Settings, Sparkles, Users, X, Bookmark, ChevronDown, LogOut, UserRound } from "lucide-react";
import { NAV_GROUPS } from "@/lib/config";
import { safeRead, safeWrite, STORAGE_KEYS } from "@/lib/storage";
import { defaultProfile } from "@/data/mock";

const icons: Record<string, any> = { layout: LayoutDashboard, package: PackageSearch, users: Users, home: Home, sparkles: Sparkles, calendar: CalendarDays, orbit: Orbit, calculator: Calculator, map: Map };

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false); const [profile, setProfile] = useState(defaultProfile); const [ready, setReady] = useState(false);
  useEffect(() => {
    const session = safeRead<{ authenticated?: boolean } | null>(STORAGE_KEYS.session, null);
    if (!session?.authenticated) router.replace("/login");
    setProfile(safeRead(STORAGE_KEYS.profile, defaultProfile)); setReady(true);
  }, [router]);
  useEffect(() => { setMobileMenu(false); }, [pathname]);
  if (!ready) return createElement("div", { className: "app-loading" }, createElement("div", { className: "brand-mark" }, "U"), createElement("span", null, "Opening your universe…"));
  const isActive = (href: string) => pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
  const signOut = () => { safeWrite(STORAGE_KEYS.session, null); router.push("/login"); };
  const navContent = <>
    <div className="sidebar-brand"><Link href="/dashboard" className="brand-lockup"><span className="brand-mark">U</span><span><b>UniVerse</b><small>STUDENT OS</small></span></Link><button className="mobile-close" onClick={() => setMobileMenu(false)} aria-label="Close menu"><X size={18}/></button></div>
    <div className="university-switch"><span className="university-dot">L</span><span><b>LPU workspace</b><small>Lovely Professional University</small></span><ChevronDown size={15}/></div>
    <nav className="sidebar-nav">{NAV_GROUPS.map(group => <div className="nav-group" key={group.label}><span className="nav-label">{group.label}</span>{group.items.map(item => { const Icon = icons[item.icon] || Compass; return <Link key={item.href} href={item.href} className={`nav-link ${isActive(item.href) ? "active" : ""}`}><Icon size={17}/><span>{item.label}</span>{item.href === "/nova" && <i className="nova-signal"/>}</Link>; })}</div>)}
      <div className="nav-group"><span className="nav-label">Personal</span><Link href="/profile" className={`nav-link ${isActive("/profile") ? "active" : ""}`}><UserRound size={17}/><span>Profile</span></Link><Link href="/saved" className={`nav-link ${isActive("/saved") ? "active" : ""}`}><Bookmark size={17}/><span>Saved</span></Link><Link href="/notifications" className={`nav-link ${isActive("/notifications") ? "active" : ""}`}><Bell size={17}/><span>Notifications</span><i className="notification-dot"/></Link><Link href="/settings" className={`nav-link ${isActive("/settings") ? "active" : ""}`}><Settings size={17}/><span>Settings</span></Link></div>
    </nav>
    <div className="sidebar-bottom"><div className="sidebar-help"><div className="help-glow"><Orbit size={18}/></div><b>A little help goes a long way.</b><span>Ask Nova when you need a hand finding your next step.</span><Link href="/nova">Talk to Nova <span>↗</span></Link></div><button className="profile-switch" onClick={() => router.push("/profile")}><span className="profile-avatar">{profile.name.slice(0,1).toUpperCase()}</span><span><b>{profile.name}</b><small>Student account · Demo</small></span><ChevronDown size={15}/></button></div>
  </>;
  return <div className="platform-frame"><aside className="sidebar">{navContent}</aside>{mobileMenu && <div className="mobile-overlay" onClick={() => setMobileMenu(false)}><aside className="sidebar mobile-sidebar" onClick={e => e.stopPropagation()}>{navContent}</aside></div>}<div className="platform-main"><header className="app-topbar"><button className="mobile-menu-button" onClick={() => setMobileMenu(true)} aria-label="Open menu"><Menu size={20}/></button><div className="topbar-context"><span className="context-kicker">YOUR CAMPUS, CONNECTED</span><span className="context-title">{pathname.split("/").filter(Boolean).slice(-1)[0]?.replaceAll("-", " ") || "Dashboard"}</span></div><div className="topbar-actions"><button className="topbar-search" onClick={() => router.push("/dashboard")}><Search size={16}/><span>Quick search</span><kbd>⌘ K</kbd></button><Link href="/notifications" className="topbar-icon" aria-label="Notifications"><Bell size={18}/><i/></Link><Link href="/profile" className="topbar-user"><span className="profile-avatar small">{profile.name.slice(0,1).toUpperCase()}</span></Link><button className="topbar-icon logout-button" onClick={signOut} title="Sign out"><LogOut size={17}/></button></div></header><main className="platform-content">{children}</main><footer className="platform-footer"><span>© 2026 UniVerse</span><span>Independent student-built demo · Not an official LPU service</span></footer></div><MobileBar pathname={pathname}/></div>;
}
function MobileBar({ pathname }: { pathname: string }) {
 const entries = [{ href: "/dashboard", label: "Home", icon: LayoutDashboard }, { href: "/team-finder", label: "Teams", icon: Users }, { href: "/nova", label: "Nova", icon: Orbit }, { href: "/campus-navigation", label: "Explore", icon: Compass }, { href: "/saved", label: "Saved", icon: Bookmark }];
 return <nav className="mobile-bottom-nav">{entries.map(({href,label,icon:Icon}) => <Link key={href} href={href} className={pathname.startsWith(href) ? "active" : ""}><Icon size={19}/><span>{label}</span></Link>)}</nav>;
}
