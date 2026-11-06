import type { Metadata } from "next";
import { EventsHome } from "@/features/events/EventsHome";
export const metadata: Metadata = { title: "Events" };
export default function Page() { return <EventsHome />; }
