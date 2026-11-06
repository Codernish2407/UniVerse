import type { AppNotification } from "@/types/domain";

export const NOTIFICATIONS: AppNotification[] = [
  { id: "nt_1", title: "Welcome to UniVerse demo", body: "Everything here is sample data stored in your browser.", at: "2026-11-01T09:00:00.000Z", read: false, href: "/dashboard" },
  { id: "nt_2", title: "New event: Innovation Hackathon 24h", body: "Find teammates and save it to your list.", at: "2026-11-02T09:00:00.000Z", read: false, href: "/events/ev_01" },
  { id: "nt_3", title: "A found item matches your search", body: "Student ID card holder found near Block 32 (sample).", at: "2026-11-03T09:00:00.000Z", read: true, href: "/lost-found/lf_02" },
];
