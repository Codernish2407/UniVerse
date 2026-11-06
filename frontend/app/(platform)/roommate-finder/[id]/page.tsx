import { RoommateDetail } from "@/features/roommate-finder/RoommateDetail";
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <RoommateDetail id={id} />; }
