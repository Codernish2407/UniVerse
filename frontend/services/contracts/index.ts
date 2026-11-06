/**
 * Service contracts. The UI depends ONLY on these interfaces.
 * To go live, implement them against the Express API and swap the export in services/index.ts.
 */
import type {
  AppNotification, Campus, CampusEvent, CampusRoute, ChatMessage, Club, Conversation, LostFoundItem,
  Preferences, RoommateListing, SavedItem, SavedKind, SemesterRecord, StudentProfile, TeamOpportunity,
} from "@/types/domain";

export interface SignUpInput { name: string; email: string; course: string; graduationYear: number; universityId: string }
export interface AuthService {
  getSession(): Promise<StudentProfile | null>;
  signInDemo(): Promise<StudentProfile>;
  signIn(email: string, password: string): Promise<StudentProfile>;
  signUp(input: SignUpInput): Promise<StudentProfile>;
  signOut(): Promise<void>;
}
export interface ProfileService {
  list(): Promise<StudentProfile[]>;
  get(id: string): Promise<StudentProfile | undefined>;
  updateMe(patch: Partial<StudentProfile>): Promise<StudentProfile>;
}
export interface CrudService<T> {
  list(): Promise<T[]>; get(id: string): Promise<T | undefined>;
  create(item: T): Promise<T>; update(id: string, patch: Partial<T>): Promise<T | undefined>; remove(id: string): Promise<void>;
}
export interface LostFoundService extends CrudService<LostFoundItem> {
  requestOwnership(id: string, who: { id: string; name: string }, note: string): Promise<void>;
  report(id: string): Promise<void>;
}
export interface TeamFinderService extends CrudService<TeamOpportunity> {
  apply(id: string, who: { id: string; name: string }, message: string): Promise<void>;
}
export interface RoommateService extends CrudService<RoommateListing> {
  requestConnection(id: string, who: { id: string; name: string }): Promise<void>;
}
export type ClubService = Pick<CrudService<Club>, "list" | "get">;
export type EventService = Pick<CrudService<CampusEvent>, "list" | "get">;
export interface CampusNavigationService {
  getCampus(universityId: string): Promise<Campus>;
  findRoute(universityId: string, fromId: string, toId: string): Promise<CampusRoute | null>;
}
export interface AcademicService { list(): Promise<SemesterRecord[]>; save(all: SemesterRecord[]): Promise<void>; clear(): Promise<void> }
export interface SavedService {
  list(): Promise<SavedItem[]>;
  toggle(kind: SavedKind, id: string): Promise<boolean>;
}
export interface NotificationService { list(): Promise<AppNotification[]>; markAllRead(): Promise<void>; markRead(id: string): Promise<void> }
export interface PreferenceService { get(): Promise<Preferences>; set(p: Preferences): Promise<void> }
/** Nova adapter. Later: POST to the Express endpoint, optionally streaming tokens. */
export interface NovaService {
  readonly mode: "mock" | "live";
  ask(message: string, history: ChatMessage[]): Promise<ChatMessage>;
  listConversations(): Promise<Conversation[]>;
  saveConversations(c: Conversation[]): Promise<void>;
}
export interface DemoService { reset(): Promise<void> }
