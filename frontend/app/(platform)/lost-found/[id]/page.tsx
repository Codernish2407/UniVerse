import { ItemDetail } from "@/features/lost-found/ItemDetail";
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <ItemDetail id={id} />; }
