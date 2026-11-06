import type { Metadata } from "next";
import { ProfileEdit } from "@/features/profile/ProfileEdit";
export const metadata: Metadata = { title: "Edit profile" };
export default function Page() { return <ProfileEdit />; }
