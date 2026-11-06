import Link from "next/link";
import { Calculator, MapPin, PackageSearch, Sparkles, UserPlus, Home } from "lucide-react";
import { ROUTES } from "@/config/routes";

const ACTIONS = [
  { label: "Report lost item", href: `${ROUTES.lostFound}/create`, icon: PackageSearch },
  { label: "Find teammates", href: ROUTES.teamFinder, icon: UserPlus },
  { label: "Find roommate", href: ROUTES.roommateFinder, icon: Home },
  { label: "Ask Nova", href: ROUTES.nova, icon: Sparkles },
  { label: "Calculate CGPA", href: ROUTES.cgpa, icon: Calculator },
  { label: "Explore campus", href: ROUTES.campus, icon: MapPin },
];
export function QuickActions() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      {ACTIONS.map((a) => (
        <li key={a.href}><Link href={a.href} className="flex min-h-[84px] flex-col items-start justify-between gap-3 rounded-2xl border border-border bg-card p-3.5 transition-colors hover:bg-hover">
          <a.icon className="size-5 text-primary-soft" aria-hidden /><span className="text-sm font-medium">{a.label}</span></Link></li>
      ))}
    </ul>
  );
}
