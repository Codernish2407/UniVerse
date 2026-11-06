import type { Metadata } from "next";
import { RoommateForm } from "@/features/roommate-finder/RoommateForm";
export const metadata: Metadata = { title: "Your roommate listing" };
export default function Page() { return <RoommateForm />; }
