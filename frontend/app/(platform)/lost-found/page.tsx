import type { Metadata } from "next";
import { LostFoundList } from "@/features/lost-found/LostFoundList";
export const metadata: Metadata = { title: "Lost & Found" };
export default function Page() { return <LostFoundList />; }
