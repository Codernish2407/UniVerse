import { CalendarDays, Calculator, Home, MapPin, PackageSearch, Sparkles, UserPlus, Users, type LucideIcon } from "lucide-react";
import { ROUTES } from "@/config/routes";

export interface FeatureMeta { id: string; title: string; summary: string; href: string; icon: LucideIcon; ai?: boolean }
export const FEATURES: FeatureMeta[] = [
  { id: "lost-found", title: "Lost & Found", summary: "Post and search lost or found items without digging through group chats.", href: ROUTES.lostFound, icon: PackageSearch },
  { id: "team", title: "Team Finder", summary: "Find teammates by skill for hackathons, projects and research.", href: ROUTES.teamFinder, icon: UserPlus },
  { id: "roommate", title: "Roommate Finder", summary: "Compare habits and budgets, with a score that shows its reasoning.", href: ROUTES.roommateFinder, icon: Home },
  { id: "nova", title: "Nova AI", summary: "A guide to every UniVerse feature. Demo mode today, real AI later.", href: ROUTES.nova, icon: Sparkles, ai: true },
  { id: "cgpa", title: "CGPA Calculator", summary: "Work out SGPA and CGPA across semesters with a configurable grade scale.", href: ROUTES.cgpa, icon: Calculator },
  { id: "clubs", title: "Clubs", summary: "Search student organisations and save the ones you want to follow.", href: ROUTES.clubs, icon: Users },
  { id: "events", title: "Events", summary: "Discover what's on, save events and add them to your calendar.", href: ROUTES.events, icon: CalendarDays },
  { id: "campus", title: "Campus Navigation", summary: "Find blocks and facilities. Sample layout until verified campus data is added.", href: ROUTES.campus, icon: MapPin },
];
