import type { Metadata } from "next";
import { RoommateHome } from "@/features/roommate-finder/RoommateHome";
export const metadata: Metadata = { title: "Roommate Finder" };
export default function Page() { return <RoommateHome />; }
