import type { Listing } from "@/data/mock";

export interface AuthUser { id: string; name: string; email: string; universityId: string; }
export interface AuthService { signInDemo(email: string, name?: string): Promise<AuthUser>; signOut(): Promise<void>; getSession(): Promise<AuthUser | null>; }
export interface CollectionService<T extends { id: string }> { list(): Promise<T[]>; getById(id: string): Promise<T | null>; create(input: Omit<T, "id">): Promise<T>; update(id: string, patch: Partial<T>): Promise<T | null>; remove(id: string): Promise<boolean>; }
export interface LostFoundService extends CollectionService<Listing> { closeListing(id: string): Promise<Listing | null>; }
export interface TeamFinderService extends CollectionService<Listing> { apply(opportunityId: string): Promise<{ recordedLocally: true }>; }
export interface RoommateService extends CollectionService<Listing> { requestConnection(profileId: string): Promise<{ recordedLocally: true }>; }
export interface NovaService { reply(message: string): Promise<{ text: string; mode: "mock" }>; }
export interface AcademicService { saveSemesters<T>(semesters: T[]): Promise<void>; loadSemesters<T>(): Promise<T[]>; }
export interface ClubService extends CollectionService<Listing> { expressInterest(clubId: string): Promise<{ recordedLocally: true }>; }
export interface EventService extends CollectionService<Listing> { exportCalendar(event: Listing): string; }
export interface CampusLocation { id: string; universityId: string; name: string; category: string; description: string; coordinates?: { lat: number; lng: number }; verified: boolean; }
export interface CampusNavigationService { listLocations(): Promise<CampusLocation[]>; findLocation(id: string): Promise<CampusLocation | null>; previewRoute(originId: string, destinationId: string): Promise<{ available: false; reason: string }>; }
export interface ProfileService<T> { get(): Promise<T>; update(profile: T): Promise<T>; }
