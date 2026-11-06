import Link from "next/link";
import { ArrowRight, PackageSearch, Users, Home, Orbit, Calculator, Sparkles, CalendarDays, MapPin } from "lucide-react";
import { PageHeading } from "@/components/ui";
const modules = [
 ["Lost & Found", "Reconnect people with misplaced belongings.", PackageSearch, "/lost-found"],
 ["Team Finder", "Find collaborators for projects and hackathons.", Users, "/team-finder"],
 ["Roommate Finder", "Compare routines, preferences and budgets.", Home, "/roommate-finder"],
 ["Nova AI", "A conversational guide to the UniVerse experience.", Orbit, "/nova"],
 ["CGPA Calculator", "Calculate SGPA and CGPA with configurable grade points.", Calculator, "/cgpa-calculator"],
 ["Clubs", "Explore student communities and interests.", Sparkles, "/clubs"],
 ["Events", "Keep experiences and opportunities in view.", CalendarDays, "/events"],
 ["Campus Navigation", "Search campus destinations and place categories.", MapPin, "/campus-navigation"],
] as const;
export default function FeaturesPage(){return <div className="marketing-shell"><header className="marketing-nav"><Link href="/" className="brand-lockup"><span className="brand-mark">U</span><span><b>UniVerse</b><small>STUDENT OS</small></span></Link><nav><Link href="/features">Features</Link><Link href="/about">About</Link></nav><div className="marketing-actions"><Link href="/login" className="nav-login">Log in</Link><Link href="/signup" className="button button-primary">Get started <ArrowRight size={15}/></Link></div><details className="marketing-mobile-menu"><summary aria-label="Open menu">☰</summary><div><a href="/features">Features</a><a href="/about">About</a><a href="/login">Log in</a><a href="/signup">Get started</a></div></details></header><main className="marketing-subpage"><div className="subpage-intro"><span className="eyebrow">THE WHOLE STUDENT JOURNEY</span><h1>Eight ways to make<br/><em>campus life feel connected.</em></h1><p>Each module solves a different everyday need, but they all share one profile, one familiar experience and one student-first point of view.</p></div><div className="feature-grid">{modules.map(([name,desc,Icon,href],i)=><Link className="feature-tile" href={href} key={name}><div className="feature-top"><span>0{i+1}</span><Icon size={20}/></div><h3>{name}</h3><p>{desc}</p><span className="feature-arrow"><ArrowRight size={17}/></span></Link>)}</div><div className="subpage-cta"><h2>Ready to explore?</h2><p>Enter the demo workspace and see how the pieces fit together.</p><Link className="button button-primary" href="/signup">Create a demo account <ArrowRight size={16}/></Link></div></main><footer className="marketing-footer"><div className="footer-bottom"><span>© 2026 UniVerse</span><span>Independent student-built product concept.</span></div></footer></div>}
