import type { ID, ISODate } from "./common";

export type Availability = "open" | "limited" | "unavailable";

export interface StudentProfile {
  id: ID;
  universityId: string;
  name: string;
  email: string;
  course: string;
  graduationYear: number;
  semester: number;
  bio: string;
  skills: string[];
  interests: string[];
  github: string;
  linkedin: string;
  portfolio: string;
  availability: Availability;
  projectExperience: string[];
  collaborationPrefs: string;
}

// ---------- Lost & Found
export type LostFoundKind = "lost" | "found";
export type LostFoundStatus = "open" | "closed";
export type LostFoundCategory = "Electronics" | "ID & Cards" | "Books & Notes" | "Bags" | "Keys" | "Clothing" | "Accessories" | "Other";
export type ContactMethod = "in-app" | "campus-desk";
export interface LostFoundItem {
  id: ID; universityId: string; ownerId: ID; ownerName: string;
  title: string; kind: LostFoundKind; category: LostFoundCategory;
  description: string; location: string; date: string; status: LostFoundStatus;
  imageDataUrl?: string; contactMethod: ContactMethod; createdAt: ISODate;
  ownershipRequests: { studentId: ID; name: string; note: string; at: ISODate }[];
  reported: boolean; isSample: boolean;
}

// ---------- Team Finder
export type ProjectCategory = "Hackathon" | "College project" | "Startup idea" | "Coding competition" | "Design project" | "Research";
export type CollabMode = "online" | "on-campus" | "hybrid";
export interface TeamApplication { studentId: ID; name: string; message: string; at: ISODate }
export interface TeamOpportunity {
  id: ID; universityId: string; ownerId: ID; ownerName: string;
  title: string; description: string; category: ProjectCategory;
  skills: string[]; teamSize: number; mode: CollabMode; eventId?: ID;
  applicants: TeamApplication[]; status: "open" | "closed"; createdAt: ISODate; isSample: boolean;
}

// ---------- Roommate Finder
export type AccommodationType = "Hostel" | "Off-campus flat" | "PG";
export type SleepSchedule = "Early bird" | "Flexible" | "Night owl";
export type StudyHabit = "Quiet room" | "Group study" | "Flexible";
export type SharingPref = "Single" | "Double" | "Triple";
export interface RoommateListing {
  id: ID; universityId: string; ownerId: ID; displayName: string; course: string;
  accommodation: AccommodationType; budgetMin: number; budgetMax: number;
  cleanliness: 1 | 2 | 3 | 4 | 5; sleep: SleepSchedule; study: StudyHabit; sharing: SharingPref;
  lifestyle: string[]; available: boolean; about: string;
  connectionRequests: { studentId: ID; name: string; at: ISODate }[];
  createdAt: ISODate; isSample: boolean;
}

// ---------- Clubs & Events
export interface Club {
  id: ID; universityId: string; name: string; category: string; description: string;
  activities: string[]; tags: string[]; featured: boolean; contactNote: string; isSample: boolean;
}
export interface CampusEvent {
  id: ID; universityId: string; title: string; description: string; category: string;
  start: ISODate; end: ISODate; venue: string; venueLocationId?: ID; organizer: string;
  clubId?: ID; registrationNote: string; featured: boolean; isSample: boolean;
}

// ---------- Campus navigation
export type CampusCategoryId = "academic" | "library" | "hostel" | "food" | "admin" | "sports" | "medical" | "gate" | "landmark";
export interface CampusCategory { id: CampusCategoryId; label: string }
export interface CampusLocation {
  id: ID; universityId: string; name: string; category: CampusCategoryId; description: string;
  /** Position on the schematic demo map (0-1000 x 0-700). NOT real-world coordinates. */
  schematic: { x: number; y: number };
  /** Real coordinates; only set when verified. */
  geo?: { lat: number; lng: number };
  landmark: string; imageUrl?: string; accessibility?: string; verified: boolean;
}
export interface CampusWaypoint { x: number; y: number; label?: string }
export interface CampusRoute {
  id: ID; universityId: string; fromId: ID; toId: ID; waypoints: CampusWaypoint[];
  isDemo: boolean; note: string;
}
export interface Campus {
  id: ID; universityId: string; name: string; dataStatus: "sample" | "verified";
  categories: CampusCategory[]; locations: CampusLocation[]; routes: CampusRoute[];
}

// ---------- Nova
export interface ChatMessage { id: ID; role: "user" | "nova"; text: string; at: ISODate; links?: { label: string; href: string }[] }
export interface Conversation { id: ID; title: string; messages: ChatMessage[]; updatedAt: ISODate }

// ---------- Academics
export interface CourseEntry { id: ID; name: string; credits: string; grade: string }
export interface SemesterRecord { id: ID; label: string; courses: CourseEntry[]; savedAt?: ISODate }

// ---------- Platform
export type SavedKind = "lost-found" | "team" | "student" | "roommate" | "club" | "event" | "place";
export interface SavedItem { kind: SavedKind; id: ID; at: ISODate }
export interface AppNotification { id: ID; title: string; body: string; href?: string; at: ISODate; read: boolean }
export interface Preferences {
  notifications: { events: boolean; teamRequests: boolean; lostFound: boolean; product: boolean };
  privacy: { showProfileInTeamFinder: boolean; showCourse: boolean };
  appearance: { reduceMotion: boolean };
  interestedClubs: ID[]; eventInterest: ID[];
}
