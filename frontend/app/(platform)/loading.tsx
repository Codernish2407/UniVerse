import { PageContainer } from "@/components/shared/PageContainer";
import { LoadingSkeleton, Skeleton } from "@/components/shared/LoadingSkeleton";
export default function Loading() { return <PageContainer><Skeleton className="mb-6 h-10 w-64" /><LoadingSkeleton /></PageContainer>; }
