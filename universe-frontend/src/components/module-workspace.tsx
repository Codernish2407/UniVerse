"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Bookmark, CalendarDays, Check, Filter, MapPin, Plus, Search, SlidersHorizontal, Sparkles, Users } from "lucide-react";
import { lostFoundSeed, teamSeed, roommateSeed, clubSeed, eventSeed, Listing } from "@/data/mock";
import { MODULE_META } from "@/lib/config";
import { usePersistentState, useToast } from "@/lib/hooks";
import { makeId, STORAGE_KEYS } from "@/lib/storage";
import { calculatePreferenceOverlap } from "@/lib/academic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingSchema, ListingFormValues } from "@/lib/schemas";
import { Avatar, Badge, Button, Card, Dialog, EmptyState, Field, PageHeading, Tag, Toast } from "@/components/ui";

type ModuleKey = keyof typeof MODULE_META;
const seeds: Record<ModuleKey, Listing[]> = { "lost-found": lostFoundSeed, "team-finder": teamSeed, "roommate-finder": roommateSeed, clubs: clubSeed, events: eventSeed };
const tabs: Record<ModuleKey, string[]> = {
  "lost-found": ["All items", "Lost", "Found"], "team-finder": ["All opportunities", "Hackathon", "Project", "Open source"],
  "roommate-finder": ["All profiles", "Shared room", "2 BHK sharing", "Private room"], clubs: ["All clubs", "Technology", "Arts & Culture", "Learning & Development"], events: ["All events", "Workshop", "Technology", "Community"],
};
const toneFor = (status: string) => status === "Found" || status === "Open" || status === "Available" ? "green" : status === "Lost" ? "amber" : status === "Sample" ? "violet" : "neutral";

export function ModuleWorkspace({ module }: { module: ModuleKey }) {
  const meta = MODULE_META[module];
  const [items, setItems] = usePersistentState<Listing[]>(STORAGE_KEYS.dataPrefix + module, seeds[module]);
  const [saved, setSaved] = usePersistentState<string[]>(STORAGE_KEYS.saved, []);
  const [query, setQuery] = useState(""); const [tab, setTab] = useState(tabs[module][0]); const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(""); const [description, setDescription] = useState(""); const [category, setCategory] = useState("General"); const [location, setLocation] = useState("LPU campus"); const [itemType, setItemType] = useState("Lost"); const [locationFilter, setLocationFilter] = useState("All locations"); const [sortOrder, setSortOrder] = useState("newest"); const { message, showToast } = useToast();
  const filtered = useMemo(() => items.filter(item => {
    const text = `${item.title} ${item.description} ${item.category} ${item.location} ${item.tags.join(" ")}`.toLowerCase();
    const matches = text.includes(query.toLowerCase());
    const matchTab = tab === tabs[module][0] || (module === "lost-found" ? item.status === tab : module === "team-finder" ? (tab === "People" ? item.category === "Student profile" : tab === "Hackathon" ? item.title.toLowerCase().includes("hackathon") : tab === "Project" ? item.category.toLowerCase().includes("product") || item.title.toLowerCase().includes("project") : tab === "Open source" ? item.category.toLowerCase().includes("source") || item.title.toLowerCase().includes("open-source") : true) : item.category === tab);
    const matchLocation = locationFilter === "All locations" || item.location === locationFilter;
    return matches && matchTab && matchLocation;
  }).sort((a,b) => sortOrder === "newest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)), [items, query, tab, module, locationFilter, sortOrder]);
  const create = (e: React.FormEvent) => { e.preventDefault(); if (!title.trim() || !description.trim()) return; const date = new Date().toISOString().slice(0,10); const next: Listing = { id: makeId(), universityId: "lpu-demo", title: title.trim(), description: description.trim(), category, location, status: module === "lost-found" ? itemType : module === "roommate-finder" ? "Available" : module === "events" || module === "clubs" ? "Sample" : "Open", date, owner: "You", initials: "YO", tags: [category, "New"], kind: module === "lost-found" ? itemType : undefined, meta: module === "events" ? "Demo listing · Not an official announcement" : "Demo listing" }; setItems([next, ...items]); setOpen(false); setTitle(""); setDescription(""); showToast(`${meta.singular} added to your demo workspace.`); };
  const toggleSaved = (id: string) => { const has = saved.includes(id); setSaved(has ? saved.filter(x => x !== id) : [...saved, id]); showToast(has ? "Removed from saved." : "Saved for later."); };
  return <>
    <PageHeading eyebrow={meta.eyebrow} title={meta.title} description={meta.description} action={<Button onClick={() => setOpen(true)}><Plus size={16}/>{meta.action}</Button>}/>
    {module === "events" && <div className="sample-banner"><Sparkles size={16}/><span>Sample event directory — dates, venues and organizer information are illustrative, not official campus announcements.</span></div>}
    {module === "clubs" && <div className="sample-banner"><InfoIcon/><span>Illustrative directory entries. Verify current club activity and joining requirements through official student-organization channels.</span></div>}
    <div className="module-toolbar"><label className="search-field wide"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder={`Search ${meta.title.toLowerCase()}...`}/></label><select className="toolbar-select" aria-label="Filter by location" value={locationFilter} onChange={e=>setLocationFilter(e.target.value)}><option>All locations</option>{Array.from(new Set(items.map(x=>x.location))).map(x=><option key={x}>{x}</option>)}</select><select className="toolbar-select sort-select" aria-label="Sort listings" value={sortOrder} onChange={e=>setSortOrder(e.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></div>
    <div className="tabs-row">{tabs[module].map(t => <button key={t} className={`tab-button ${tab === t ? "selected" : ""}`} onClick={() => setTab(t)}>{t}</button>)}<span className="result-count">{filtered.length} {filtered.length === 1 ? "result" : "results"}</span></div>
    {filtered.length === 0 ? <EmptyState title="Nothing in this orbit yet" description="Try another search or filter, or add the first item to your demo workspace." action={<Button variant="secondary" onClick={() => { setQuery(""); setTab(tabs[module][0]); setOpen(true); }}>Add something <Plus size={15}/></Button>}/> : <div className="listing-grid">{filtered.map(item => <Card className="listing-card" key={item.id}>
      <div className="listing-topline"><Badge tone={toneFor(item.status) as any}>{item.status}</Badge><button className={`save-button ${saved.includes(item.id) ? "saved" : ""}`} onClick={() => toggleSaved(item.id)} aria-label="Save listing"><Bookmark size={17} fill={saved.includes(item.id) ? "currentColor" : "none"}/></button></div>
      <Link href={`/${module}/${item.id}`} className="listing-title"><h3>{item.title}</h3><ArrowUpRight size={17}/></Link>
      <p className="listing-description">{item.description}</p>
      {item.budget && <div className="listing-budget">{item.budget}</div>}
      <div className="tag-row">{item.tags.slice(0,4).map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
      <div className="listing-meta"><span><MapPin size={14}/>{item.location}</span><span><CalendarDays size={14}/>{new Date(item.date + "T12:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span></div>
      <div className="listing-owner"><Avatar initials={item.initials} size="sm"/><span><b>{item.owner}</b><small>{item.meta || item.category}</small></span><Link href={`/${module}/${item.id}`} className="small-arrow" aria-label="View details"><ArrowUpRight size={16}/></Link></div>
    </Card>)}</div>}
    <Dialog open={open} title={meta.action} onClose={() => setOpen(false)}><form className="form-stack" onSubmit={create}>{module === "lost-found" && <Field label="Listing type"><select value={itemType} onChange={e=>setItemType(e.target.value)}><option>Lost</option><option>Found</option></select></Field>}<Field label="Title"><input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Give it a clear name"/></Field><Field label="Description"><textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder="Add the details someone should know"/></Field><div className="form-grid"><Field label="Category"><select value={category} onChange={e => setCategory(e.target.value)}><option>General</option><option>Technology</option><option>Workshop</option><option>Books & Stationery</option><option>Electronics</option><option>Arts & Culture</option><option>Product / Design</option></select></Field><Field label="Location"><input value={location} onChange={e => setLocation(e.target.value)} /></Field></div>{module === "events" && <p className="form-hint">This creates a sample listing only. It does not publish an official event or register attendees.</p>}<div className="dialog-actions"><Button type="submit">Add to demo workspace</Button><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button></div></form></Dialog>
    <Toast message={message} onClose={() => showToast("")}/>
  </>;
}
function InfoIcon() { return <span className="sample-info">i</span>; }

export function ListingDetail({ module, id }: { module: ModuleKey; id: string }) {
  const [items, setItems] = usePersistentState<Listing[]>(STORAGE_KEYS.dataPrefix + module, seeds[module]);
  const [saved, setSaved] = usePersistentState<string[]>(STORAGE_KEYS.saved, []);
  const [requests, setRequests] = usePersistentState<string[]>("universe.demo.requests.v1", []);
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const { message, showToast } = useToast();
  const item = items.find(x => x.id === id) || seeds[module].find(x => x.id === id);
  if (!item) return <div className="detail-not-found"><h2>This listing has moved.</h2><p>It may have been removed from your demo data.</p><Link href={`/${module}`}>Back to {MODULE_META[module].title}</Link></div>;
  const isSaved = saved.includes(id);
  const isOwner = item.owner === "You";
  const requested = requests.includes(id);
  const contact = () => {
    if (!requested) setRequests([...requests, id]);
    showToast("Your demo interest is recorded locally. No message was sent to another student.");
  };
  const closeListing = () => {
    setItems(items.map(x => x.id === id ? { ...x, status: "Closed" } : x));
    showToast("Listing closed in your local demo workspace.");
  };
  const openEdit = () => { setEditTitle(item.title); setEditDescription(item.description); setEditOpen(true); };
  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setItems(items.map(x => x.id === id ? { ...x, title: editTitle.trim(), description: editDescription.trim() } : x));
    setEditOpen(false); showToast("Your listing was updated locally.");
  };
  const exportCalendar = () => {
    const date = item.date.replaceAll("-", "") + "T100000";
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//UniVerse//Student Events//EN", "BEGIN:VEVENT", `UID:${item.id}@universe-demo`, `DTSTAMP:${new Date().toISOString().replaceAll("-", "").replaceAll(":", "").replace(/\.\d{3}/, "")}`, `DTSTART:${date}`, `SUMMARY:${item.title.replace(/[\\,;]/g, "\\$&")}`, `DESCRIPTION:${item.description.replace(/[\\,;]/g, "\\$&")}`, `LOCATION:${item.location.replace(/[\\,;]/g, "\\$&")}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = `${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "universe-event"}.ics`; link.click(); URL.revokeObjectURL(url);
    showToast("Calendar file exported. Check event details with the organizer before attending.");
  };
  const demoCriteria = ["Quiet study", "Non-smoker", "Cleanliness: High"];
  const compatibility = calculatePreferenceOverlap(item.tags.concat(item.preference ? item.preference.split("·").map(x=>x.trim()) : []), demoCriteria);
  const matchedCriteria = compatibility.matched;
  const matchScore = compatibility.score;
  return <>
    <div className="back-link"><Link href={`/${module}`}>← Back to {MODULE_META[module].title}</Link></div>
    <PageHeading eyebrow={MODULE_META[module].eyebrow} title={item.title} description={item.category} action={<div className="detail-heading-actions"><Button variant="secondary" onClick={() => { setSaved(isSaved ? saved.filter(x => x !== id) : [...saved, id]); showToast(isSaved ? "Removed from saved." : "Saved for later."); }}><Bookmark size={16}/>{isSaved ? "Saved" : "Save"}</Button>{module === "events" && <Button variant="secondary" onClick={exportCalendar}><CalendarDays size={15}/> Add to calendar</Button>}</div>}/>
    <div className="detail-layout"><Card className="detail-main"><div className="listing-topline"><Badge tone={toneFor(item.status) as any}>{item.status}</Badge><span className="muted-label">Posted {new Date(item.date + "T12:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span></div><h2>About this {MODULE_META[module].singular}</h2><p className="detail-copy">{item.description}</p><div className="detail-facts"><div><span>Category</span><b>{item.category}</b></div><div><span>Location</span><b>{item.location}</b></div>{item.budget && <div><span>Budget</span><b>{item.budget}</b></div>}{item.preference && <div><span>Preferences</span><b>{item.preference}</b></div>}</div><h3>Details & interests</h3><div className="tag-row">{item.tags.map(x => <Tag key={x}>{x}</Tag>)}</div>
      {module === "roommate-finder" && <div className="compatibility-note"><div className="compatibility-score">{matchScore}%</div><div><b>Demo preference overlap</b><p>Matches {matchedCriteria.length} of 3 preset demo preferences: {matchedCriteria.length ? matchedCriteria.join(", ") : "no exact preset matches"}. This rule is illustrative, not a validated compatibility prediction or a match based on your personal habits.</p></div></div>}
      {module === "events" && <div className="event-caution"><b>Sample event information</b><p>This is an illustrative listing, not an official campus announcement. The event date and venue require organizer verification. Calendar export does not register you.</p></div>}
      {isOwner && <div className="owner-actions"><Button variant="secondary" onClick={openEdit}>Edit listing</Button>{item.status !== "Closed" && <Button variant="danger" onClick={closeListing}>Close listing</Button>}</div>}
    </Card><div className="detail-aside"><Card><div className="owner-large"><Avatar initials={item.initials} size="lg"/><div><b>{item.owner}</b><small>Student · Demo profile</small></div></div><p className="detail-aside-copy">Personal contact information is not displayed. Demo actions do not send messages or share private details.</p><Button onClick={contact} disabled={item.status === "Closed" || (module === "lost-found" && item.status === "Closed")}>{requested ? "Interest recorded" : module === "lost-found" ? "Request to connect" : module === "roommate-finder" ? "Request connection" : "Express interest"}</Button></Card><Card className="privacy-card"><b>Stay thoughtful</b><p>Keep conversations on trusted channels. Verify information before making plans or sharing personal details.</p></Card></div></div>
    <Dialog open={editOpen} title="Edit your listing" onClose={() => setEditOpen(false)}><form className="form-stack" onSubmit={saveEdit}><Field label="Title"><input value={editTitle} onChange={e => setEditTitle(e.target.value)} required minLength={4}/></Field><Field label="Description"><textarea rows={5} value={editDescription} onChange={e => setEditDescription(e.target.value)} required minLength={12}/></Field><div className="dialog-actions"><Button type="submit">Save changes</Button><Button variant="ghost" onClick={() => setEditOpen(false)}>Cancel</Button></div></form></Dialog>
    <Toast message={message} onClose={() => showToast("")}/>
  </>;
}
export function CreateListingPage({ module }: { module: "lost-found" | "team-finder" | "roommate-finder" }) {
 const [items,setItems] = usePersistentState<Listing[]>(STORAGE_KEYS.dataPrefix + module, seeds[module]);
 const [done,setDone] = useState(false);
 const { register, handleSubmit, formState: { errors } } = useForm<ListingFormValues>({ resolver: zodResolver(listingSchema), defaultValues: { title: "", description: "", category: "General", location: "LPU campus", itemType: "Lost", budget: "₹5k–₹8k / month" } });
 const submit = (values: ListingFormValues) => { const next: Listing = { id: makeId(), title: values.title, description: values.description, category: values.category, location: values.location, status: module === "lost-found" ? (values.itemType || "Lost") : module === "roommate-finder" ? "Available" : "Open", date: new Date().toISOString().slice(0,10), owner: "You", initials: "YO", tags: [values.category], kind: module === "lost-found" ? (values.itemType || "Lost") : undefined, budget: module === "roommate-finder" ? values.budget : undefined, universityId: "lpu-demo" }; setItems([next,...items]); setDone(true); };
 return <><div className="back-link"><Link href={`/${module}`}>← Back</Link></div><PageHeading eyebrow="Your contribution" title={module === "lost-found" ? "Report an item" : module === "team-finder" ? "Create an opportunity" : "Create your roommate profile"} description="Add clear details so other students can understand what you need."/><Card className="form-card"><form className="form-stack" onSubmit={handleSubmit(submit)}>{module === "lost-found" && <Field label="Listing type"><select {...register("itemType")}><option>Lost</option><option>Found</option></select></Field>}<Field label="Title"><input {...register("title")} placeholder="A clear, descriptive title"/>{errors.title && <small className="form-error">{errors.title.message}</small>}</Field><Field label="Description"><textarea rows={5} {...register("description")} placeholder="Share helpful details without exposing private information"/>{errors.description && <small className="form-error">{errors.description.message}</small>}</Field><div className="form-grid"><Field label="Category"><select {...register("category")}><option>General</option><option>Electronics</option><option>Books & Stationery</option><option>Hackathon</option><option>Project</option><option>Technology</option><option>Shared room</option><option>2 BHK sharing</option></select></Field><Field label="Location"><input {...register("location")}/>{errors.location && <small className="form-error">{errors.location.message}</small>}</Field></div>{module === "roommate-finder" && <Field label="Monthly budget range"><input {...register("budget")}/></Field>}<div className="notice"><span>i</span><div>This is a local demo listing. It is stored in this browser only and is not published to other students.</div></div><Button type="submit">Create demo listing</Button>{done && <div className="success-panel"><Check size={18}/>Your listing is saved locally. <Link href={`/${module}`}>View listings</Link></div>}</form></Card></>;
}
