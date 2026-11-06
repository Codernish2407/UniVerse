import { defaultProfile, eventSeed, Listing, lostFoundSeed, teamSeed, roommateSeed, clubSeed, campusLocations } from "@/data/mock";
import { safeRead, safeWrite, STORAGE_KEYS, makeId } from "@/lib/storage";
import type { AcademicService, AuthService, CampusNavigationService, ClubService, EventService, LostFoundService, NovaService, ProfileService, RoommateService, TeamFinderService } from "@/services/contracts";

function collection(key: string, seed: Listing[]) {
  return {
    async list() { return safeRead<Listing[]>(STORAGE_KEYS.dataPrefix + key, seed); },
    async getById(id: string) { return (await this.list()).find(x => x.id === id) || null; },
    async create(input: Omit<Listing, "id">) { const next = { ...input, id: makeId() }; safeWrite(STORAGE_KEYS.dataPrefix + key, [next, ...(await this.list())]); return next; },
    async update(id: string, patch: Partial<Listing>) { const all = await this.list(); const next = all.map(x => x.id === id ? { ...x, ...patch } : x); safeWrite(STORAGE_KEYS.dataPrefix + key, next); return next.find(x => x.id === id) || null; },
    async remove(id: string) { const all = await this.list(); const next = all.filter(x => x.id !== id); safeWrite(STORAGE_KEYS.dataPrefix + key, next); return next.length !== all.length; },
  };
}

export const authService: AuthService = {
  async signInDemo(email, name = "Student") { const user = { id: "demo-user", name, email, universityId: "lpu-demo" }; safeWrite(STORAGE_KEYS.session, { authenticated: true, mode: "demo", user }); return user; },
  async signOut() { safeWrite(STORAGE_KEYS.session, null); },
  async getSession() { const s = safeRead<any>(STORAGE_KEYS.session, null); return s?.authenticated ? (s.user || { id: "demo-user", name: "Student", email: "student@example.com", universityId: "lpu-demo" }) : null; },
};
export const lostFoundService: LostFoundService = { ...collection("lost-found", lostFoundSeed), async closeListing(id) { return collection("lost-found", lostFoundSeed).update(id, { status: "Closed" }); } };
export const teamFinderService: TeamFinderService = { ...collection("team-finder", teamSeed), async apply(id) { const list = safeRead<string[]>("universe.demo.requests.v1", []); safeWrite("universe.demo.requests.v1", Array.from(new Set([...list, id]))); return { recordedLocally: true }; } };
export const roommateService: RoommateService = { ...collection("roommate-finder", roommateSeed), async requestConnection(id) { const list = safeRead<string[]>("universe.demo.requests.v1", []); safeWrite("universe.demo.requests.v1", Array.from(new Set([...list, id]))); return { recordedLocally: true }; } };
export const clubService: ClubService = { ...collection("clubs", clubSeed), async expressInterest(id) { const list = safeRead<string[]>("universe.demo.requests.v1", []); safeWrite("universe.demo.requests.v1", Array.from(new Set([...list, id]))); return { recordedLocally: true }; } };
export const eventService: EventService = { ...collection("events", eventSeed), exportCalendar(event) { const date = event.date.replaceAll("-", "") + "T100000"; const escape = (v: string) => v.replace(/[\\,;]/g, "\\$&"); return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//UniVerse//Student Events//EN", "BEGIN:VEVENT", `UID:${event.id}@universe-demo`, `DTSTAMP:${new Date().toISOString().replaceAll("-", "").replaceAll(":", "").replace(/\.\d{3}/, "")}`, `DTSTART:${date}`, `SUMMARY:${escape(event.title)}`, `DESCRIPTION:${escape(event.description)}`, `LOCATION:${escape(event.location)}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n"); } };
export const academicService: AcademicService = { async saveSemesters<T>(value: T[]) { safeWrite(STORAGE_KEYS.cgpa, value); }, async loadSemesters<T>() { return safeRead<T[]>(STORAGE_KEYS.cgpa, []); } };
export const profileService: ProfileService<typeof defaultProfile> = { async get() { return safeRead(STORAGE_KEYS.profile, defaultProfile); }, async update(profile) { safeWrite(STORAGE_KEYS.profile, profile); return profile; } };
export const novaService: NovaService = { async reply(message) { const q = message.toLowerCase(); let text = "I can help with UniVerse features and explain how this demo works. For live LPU rules, verified campus directions or current announcements, please check an official source — I don't have a connected source for those."; if (q.includes("cgpa") || q.includes("sgpa")) text = "Use the CGPA Calculator to enter courses, credits and grades across semesters. The current grade point mapping is a configurable example, not a verified official LPU scheme."; else if (q.includes("team") || q.includes("hackathon")) text = "Open Team Finder to browse demo opportunities and create a local opportunity. Application actions are stored in this browser only."; else if (q.includes("lost") || q.includes("found")) text = "Open Lost & Found to search or create a local demo listing. Avoid posting private contact information."; else if (q.includes("campus") || q.includes("map")) text = "Campus Navigation has a sample place directory. It does not contain verified coordinates or walking routes yet."; return { text, mode: "mock" }; } };
export const campusNavigationService: CampusNavigationService = { async listLocations() { return campusLocations.map(x => ({ ...x, universityId: "lpu-demo" })); }, async findLocation(id) { return (await this.listLocations()).find(x => x.id === id) || null; }, async previewRoute() { return { available: false, reason: "Verified campus coordinates and a walking-path graph are not connected in demo mode." }; } };
