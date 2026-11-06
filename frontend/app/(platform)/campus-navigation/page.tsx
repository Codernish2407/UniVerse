import { Suspense } from "react";
import type { Metadata } from "next";
import { CampusNavigation } from "@/features/campus/CampusNavigation";
export const metadata: Metadata = { title: "Campus Navigation" };
export default function Page() { return <Suspense><CampusNavigation /></Suspense>; }
