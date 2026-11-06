import { Bell, Bookmark, CalendarDays, Calculator, Compass, Home, LayoutDashboard, MapPin, PackageSearch, Settings, Sparkles, UserPlus, Users, type LucideIcon } from "lucide-react";
import { ROUTES } from "@/config/routes";

export interface NavItem { label: string; href: string; icon: LucideIcon; group: "Overview" | "Community" | "Academics" | "Campus" | "You"; primaryMobile?: boolean }

/** Single source of truth for sidebar, mobile bottom nav and the More drawer. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: ROUTES.dashboard, icon: LayoutDashboard, group: "Overview", primaryMobile: true },
  { label: "Nova AI", href: ROUTES.nova, icon: Sparkles, group: "Overview", primaryMobile: true },
  { label: "Lost & Found", href: ROUTES.lostFound, icon: PackageSearch, group: "Community" },
  { label: "Team Finder", href: ROUTES.teamFinder, icon: UserPlus, group: "Community", primaryMobile: true },
  { label: "Roommate Finder", href: ROUTES.roommateFinder, icon: Home, group: "Community" },
  { label: "CGPA Calculator", href: ROUTES.cgpa, icon: Calculator, group: "Academics" },
  { label: "Clubs", href: ROUTES.clubs, icon: Users, group: "Campus" },
  { label: "Events", href: ROUTES.events, icon: CalendarDays, group: "Campus" },
  { label: "Campus Navigation", href: ROUTES.campus, icon: MapPin, group: "Campus", primaryMobile: true },
  { label: "Saved", href: ROUTES.saved, icon: Bookmark, group: "You" },
  { label: "Notifications", href: ROUTES.notifications, icon: Bell, group: "You" },
  { label: "Settings", href: ROUTES.settings, icon: Settings, group: "You" },
];
export const NAV_GROUPS = ["Overview", "Community", "Academics", "Campus", "You"] as const;
export { Compass };
