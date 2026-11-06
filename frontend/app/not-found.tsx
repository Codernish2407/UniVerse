import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium text-secondary-soft">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">This page drifted out of orbit.</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-6 flex gap-3"><Link href="/" className={buttonVariants({ size: "lg" })}>Go home</Link><Link href="/dashboard" className={buttonVariants({ variant: "outline", size: "lg" })}>Open dashboard</Link></div>
    </main>
  );
}
