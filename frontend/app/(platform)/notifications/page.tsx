import type { Metadata } from "next";
import { NotificationsView } from "@/features/settings/NotificationsView";
export const metadata: Metadata = { title: "Notifications" };
export default function Page() { return <NotificationsView />; }
