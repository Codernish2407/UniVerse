import type { Metadata } from "next";
import { ClubsHome } from "@/features/clubs/ClubsHome";
export const metadata: Metadata = { title: "Clubs" };
export default function Page() { return <ClubsHome />; }
