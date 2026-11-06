import Link from "next/link";
export function SectionHeader({ title, href, linkLabel = "View all" }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-base font-semibold">{title}</h2>
      {href && <Link href={href} className="text-sm text-primary-soft hover:underline">{linkLabel}</Link>}
    </div>
  );
}
