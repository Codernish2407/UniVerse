import { Suspense } from "react";
import type { Metadata } from "next";
import { ItemForm } from "@/features/lost-found/ItemForm";
export const metadata: Metadata = { title: "Create listing" };
export default function Page() { return <Suspense><ItemForm /></Suspense>; }
