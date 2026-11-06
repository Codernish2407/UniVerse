import type { Metadata } from "next";
import { CgpaCalculator } from "@/features/academics/CgpaCalculator";
export const metadata: Metadata = { title: "CGPA Calculator" };
export default function Page() { return <CgpaCalculator />; }
