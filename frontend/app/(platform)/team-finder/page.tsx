import type { Metadata } from "next";
import { TeamFinderHome } from "@/features/team-finder/TeamFinderHome";
export const metadata: Metadata = { title: "Team Finder" };
export default function Page() { return <TeamFinderHome />; }
