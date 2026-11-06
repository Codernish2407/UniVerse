import { ClubDetail } from "@/features/clubs/ClubDetail";
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <ClubDetail id={id} />; }
