"use client";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bookmark, CalendarDays, Calculator, Compass, MapPin, Orbit, PackageSearch, Sparkles, Users, TrendingUp, Clock3 } from "lucide-react";
import { usePersistentState } from "@/lib/hooks";
import { defaultProfile, lostFoundSeed, teamSeed, eventSeed, clubSeed } from "@/data/mock";
import { STORAGE_KEYS } from "@/lib/storage";
import { Avatar, Badge, Card, PageHeading, SectionTitle, Metric } from "@/components/ui";

const actions = [
 { title:"Report lost item", href:"/lost-found", icon:PackageSearch, tone:"violet", text:"Find what went missing" },
 { title:"Find teammates", href:"/team-finder", icon:Users, tone:"cyan", text:"Build something together" },
 { title:"Find a roommate", href:"/roommate-finder", icon:Compass, tone:"amber", text:"Explore living matches" },
 { title:"Ask Nova", href:"/nova", icon:Orbit, tone:"violet", text:"Get a little direction" },
 { title:"Calculate CGPA", href:"/cgpa-calculator", icon:Calculator, tone:"cyan", text:"Understand your grades" },
 { title:"Explore campus", href:"/campus-navigation", icon:MapPin, tone:"amber", text:"Find your next stop" },
];
export default function DashboardPage(){
 const [profile] = usePersistentState(STORAGE_KEYS.profile,defaultProfile); const [cgpa] = usePersistentState<any[]>(STORAGE_KEYS.cgpa,[]);
 const [saved] = usePersistentState<string[]>(STORAGE_KEYS.saved,[]); const name=profile.name?.split(" ")[0] || "Student"; const hour=new Date().getHours(); const greeting=hour<12?"Good morning":hour<17?"Good afternoon":"Good evening";
 const recentItems=[...lostFoundSeed.slice(0,2),...teamSeed.slice(0,1)];
 return <><PageHeading eyebrow="THURSDAY · YOUR CAMPUS, CONNECTED" title={`${greeting}, ${name}.`} description="Here’s a little space to organise your campus day." action={<div className="date-chip"><CalendarDays size={15}/> November 5, 2026</div>}/>
 <div className="dashboard-hero"><div className="dashboard-hero-copy"><span className="hero-kicker"><span/> YOUR STUDENT SPACE</span><h2>Make today<br/><em>count for something.</em></h2><p>Find your people, follow an idea, or take the next small step. Your universe is open.</p><div className="dashboard-hero-actions"><Link className="button button-primary" href="/team-finder">Find collaborators <ArrowRight size={16}/></Link><Link className="hero-text-link" href="/nova">Talk to Nova <ArrowUpRight size={15}/></Link></div></div><div className="dashboard-hero-art"><div className="dash-orbit dash-orbit-1"/><div className="dash-orbit dash-orbit-2"/><div className="dash-orbit dash-orbit-3"/><div className="dash-core"><Orbit size={35}/></div><span className="dash-float float-a"><Users size={15}/></span><span className="dash-float float-b"><Sparkles size={15}/></span><span className="dash-float float-c"><MapPin size={15}/></span></div></div>
 <div className="metrics-grid"><Card><Metric label="Academic overview" value={cgpa.length?"In progress":"Not set yet"} detail="Add semesters in CGPA Calculator"/></Card><Card><Metric label="Saved for later" value={String(saved.length)} detail="Items across your workspace"/></Card><Card><Metric label="Campus pulse" value="Explore" detail="Discover events and communities"/></Card></div>
 <section className="dashboard-section"><SectionTitle title="Your quick launchpad" action={<span className="muted-label">Pick up where you need</span>}/><div className="quick-action-grid">{actions.map(({title,href,icon:Icon,tone,text})=><Link href={href} key={href} className="quick-action-card"><span className={`quick-action-icon ${tone}`}><Icon size={19}/></span><span><b>{title}</b><small>{text}</small></span><ArrowUpRight className="quick-action-arrow" size={16}/></Link>)}</div></section>
 <div className="dashboard-columns"><section className="dashboard-section"><SectionTitle title="A few things to explore" action={<Link href="/events" className="inline-link">All events <ArrowRight size={14}/></Link>}/><div className="activity-list">{eventSeed.slice(0,2).map((event,i)=><Link href={`/events/${event.id}`} className="activity-row" key={event.id}><div className={`activity-date activity-date-${i}`}><b>{new Date(event.date+"T12:00:00").getDate()}</b><span>{new Date(event.date+"T12:00:00").toLocaleDateString("en-IN",{month:"short"})}</span></div><div><b>{event.title}</b><small>{event.category} · {event.meta}</small></div><ArrowUpRight size={16}/></Link>)}</div></section><section className="dashboard-section"><SectionTitle title="Community spotlight" action={<Link href="/clubs" className="inline-link">Browse clubs <ArrowRight size={14}/></Link>}/><div className="club-spotlight">{clubSeed[0]&&<><div className="spotlight-icon"><Sparkles size={20}/></div><div><b>{clubSeed[0].title}</b><p>{clubSeed[0].description}</p><Badge tone="violet">Sample directory entry</Badge></div></>}</div><div className="nova-shortcut"><div className="nova-mini-icon"><Orbit size={18}/></div><div><b>Need a hand?</b><small>Nova can help you find the right UniVerse module.</small></div><Link href="/nova"><ArrowUpRight size={17}/></Link></div></section></div>
 <section className="campus-banner"><div className="campus-banner-icon"><MapPin size={20}/></div><div><span className="eyebrow">CAMPUS NAVIGATION</span><h3>New place, new route, less guesswork.</h3><p>Search the demo place directory and explore what campus navigation can become with verified map data.</p></div><Link className="button button-secondary" href="/campus-navigation">Explore campus <ArrowRight size={15}/></Link></section>
 <div className="dashboard-note"><Clock3 size={15}/> Your workspace uses browser-local demo data. Changes stay on this device and are not shared with other students.</div>
 </>;
}
