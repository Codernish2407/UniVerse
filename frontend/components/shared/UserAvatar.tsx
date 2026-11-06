import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";
export function UserAvatar({ name, className }: { name: string; className?: string }) {
  return <span aria-hidden className={cn("flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-foreground ring-1 ring-primary/30", className)}>{initials(name)}</span>;
}
