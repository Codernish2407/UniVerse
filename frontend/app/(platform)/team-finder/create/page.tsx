import type { Metadata } from "next";
import { OpportunityForm } from "@/features/team-finder/OpportunityForm";
export const metadata: Metadata = { title: "Post opportunity" };
export default function Page() { return <OpportunityForm />; }
