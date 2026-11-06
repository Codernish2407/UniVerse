import { Suspense } from "react";
import type { Metadata } from "next";
import { NovaChat } from "@/features/nova/NovaChat";
export const metadata: Metadata = { title: "Nova AI" };
export default function Page() { return <Suspense><NovaChat /></Suspense>; }
