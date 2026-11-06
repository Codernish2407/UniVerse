import Image from "next/image";
import Link from "next/link";
import { APP_CONFIG } from "@/config/app";
import { cn } from "@/lib/utils";

export function BrandMark({ href = "/", className, showName = true }: { href?: string; className?: string; showName?: boolean }) {
  return (
    <Link href={href} className={cn("flex items-center gap-2.5 rounded-lg", className)} aria-label={`${APP_CONFIG.name} home`}>
      <Image src="/logo/UniverseLogoOrbit.png" alt="" width={32} height={32} className="size-8 object-contain" priority />
      {showName && <span className="text-lg font-semibold tracking-tight">{APP_CONFIG.name}</span>}
    </Link>
  );
}
