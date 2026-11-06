import { ListingDetail } from "@/components/module-workspace";
export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <ListingDetail module="clubs" id={id}/>; }
