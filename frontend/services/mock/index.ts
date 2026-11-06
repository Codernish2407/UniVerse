import { readStore, writeStore, clearAllStores } from "@/lib/storage";
import { DEMO_USER } from "@/config/demoUser";
import { CAMPUS } from "@/data/mock/campus";
import { CLUBS } from "@/data/mock/clubs";
import { EVENTS } from "@/data/mock/events";
import { LOST_FOUND } from "@/data/mock/lostFound";
import { NOTIFICATIONS } from "@/data/mock/notifications";
import { ROOMMATES } from "@/data/mock/roommates";
import { STUDENTS } from "@/data/mock/students";
import { TEAMS } from "@/data/mock/teams";
import type { Conversation, Preferences, SemesterRecord, StudentProfile } from "@/types/domain";
import type * as C from "../contracts";
import { createCollection, makeId, wait } from "./collection";
import { novaMockReply } from "./nova";

const SESSION_KEY = "session";
const PROFILE_KEY = "me";
const blankProfile = (p: Partial<StudentProfile>): StudentProfile => ({ ...DEMO_USER, id: makeId("stu"), bio: "", skills: [], interests: [], github: "", linkedin: "", portfolio: "", projectExperience: [], collaborationPrefs: "", ...p });

// DEMO ONLY: a flag in localStorage, not a secure session and not a JWT. Passwords are never stored.
export const auth: C.AuthService = {
  async getSession() { return readStore<boolean>(SESSION_KEY, false) ? readStore<StudentProfile | null>(PROFILE_KEY, null) : null; },
  async signInDemo() { await wait(); const me = readStore<StudentProfile>(PROFILE_KEY, DEMO_USER); writeStore(PROFILE_KEY, me); writeStore(SESSION_KEY, true); return me; },
  async signIn(email) {
    await wait();
    const existing = readStore<StudentProfile | null>(PROFILE_KEY, null);
    const me = existing && existing.email === email ? existing : blankProfile({ email, name: email.split("@")[0].replace(/[._]/g, " ") });
    writeStore(PROFILE_KEY, me); writeStore(SESSION_KEY, true); return me;
  },
  async signUp(input) { await wait(); const me = blankProfile(input); writeStore(PROFILE_KEY, me); writeStore(SESSION_KEY, true); return me; },
  async signOut() { writeStore(SESSION_KEY, false); },
};

export const profiles: C.ProfileService = {
  async list() { await wait(); const me = readStore<StudentProfile>(PROFILE_KEY, DEMO_USER); return [me, ...STUDENTS.filter((s) => s.id !== me.id && s.id !== DEMO_USER.id)]; },
  async get(id) { return (await this.list()).find((s) => s.id === id); },
  async updateMe(patch) { await wait(); const me = { ...readStore<StudentProfile>(PROFILE_KEY, DEMO_USER), ...patch }; writeStore(PROFILE_KEY, me); return me; },
};

const lf = createCollection("lostFound", LOST_FOUND);
export const lostFound: C.LostFoundService = {
  ...lf,
  async requestOwnership(id, who, note) { const it = await lf.get(id); if (it) await lf.update(id, { ownershipRequests: [...it.ownershipRequests, { studentId: who.id, name: who.name, note, at: new Date().toISOString() }] }); },
  async report(id) { await lf.update(id, { reported: true }); },
};

const tm = createCollection("teams", TEAMS);
export const teams: C.TeamFinderService = {
  ...tm,
  async apply(id, who, message) {
    const t = await tm.get(id);
    if (t && !t.applicants.some((a) => a.studentId === who.id)) await tm.update(id, { applicants: [...t.applicants, { studentId: who.id, name: who.name, message, at: new Date().toISOString() }] });
  },
};

const rm = createCollection("roommates", ROOMMATES);
export const roommates: C.RoommateService = {
  ...rm,
  async requestConnection(id, who) {
    const r = await rm.get(id);
    if (r && !r.connectionRequests.some((c) => c.studentId === who.id)) await rm.update(id, { connectionRequests: [...r.connectionRequests, { studentId: who.id, name: who.name, at: new Date().toISOString() }] });
  },
};

const cl = createCollection("clubs", CLUBS);
export const clubs: C.ClubService = { list: cl.list, get: cl.get };
const ev = createCollection("events", EVENTS);
export const events: C.EventService = { list: ev.list, get: ev.get };

export const campus: C.CampusNavigationService = {
  async getCampus() { await wait(); return CAMPUS; },
  async findRoute(_u, fromId, toId) {
    await wait();
    const hit = CAMPUS.routes.find((r) => r.fromId === fromId && r.toId === toId);
    if (hit) return hit;
    const rev = CAMPUS.routes.find((r) => r.fromId === toId && r.toId === fromId);
    return rev ? { ...rev, fromId, toId, waypoints: [...rev.waypoints].reverse() } : null;
  },
};

export const academics: C.AcademicService = {
  async list() { await wait(); return readStore<SemesterRecord[]>("semesters", []); },
  async save(all) { writeStore("semesters", all); },
  async clear() { writeStore("semesters", []); },
};

export const saved: C.SavedService = {
  async list() { return readStore("saved", []); },
  async toggle(kind, id) {
    const all = readStore<{ kind: string; id: string; at: string }[]>("saved", []);
    const has = all.some((s) => s.kind === kind && s.id === id);
    writeStore("saved", has ? all.filter((s) => !(s.kind === kind && s.id === id)) : [{ kind, id, at: new Date().toISOString() }, ...all]);
    return !has;
  },
};

export const notifications: C.NotificationService = {
  async list() { return readStore("notifications", NOTIFICATIONS); },
  async markAllRead() { writeStore("notifications", readStore("notifications", NOTIFICATIONS).map((n) => ({ ...n, read: true }))); },
  async markRead(id) { writeStore("notifications", readStore("notifications", NOTIFICATIONS).map((n) => (n.id === id ? { ...n, read: true } : n))); },
};

export const DEFAULT_PREFS: Preferences = {
  notifications: { events: true, teamRequests: true, lostFound: true, product: false },
  privacy: { showProfileInTeamFinder: true, showCourse: true },
  appearance: { reduceMotion: false }, interestedClubs: [], eventInterest: [],
};
export const preferences: C.PreferenceService = {
  async get() { return { ...DEFAULT_PREFS, ...readStore<Partial<Preferences>>("prefs", {}) } as Preferences; },
  async set(p) { writeStore("prefs", p); },
};

export const nova: C.NovaService = {
  mode: "mock",
  async ask(message) { await wait(650); return novaMockReply(message); },
  async listConversations() { return readStore<Conversation[]>("nova", []); },
  async saveConversations(c) { writeStore("nova", c); },
};

export const demo: C.DemoService = { async reset() { clearAllStores(); } };
