import type { Metadata } from "next";
import { SavedView } from "@/features/settings/SavedView";
export const metadata: Metadata = { title: "Saved" };
export default function Page() { return <SavedView />; }
