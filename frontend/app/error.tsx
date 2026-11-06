"use client";
import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main id="main" role="alert" className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">An unexpected error occurred. Your demo data is safe in this browser.</p>
      <Button size="lg" className="mt-6" onClick={reset}>Try again</Button>
    </main>
  );
}
