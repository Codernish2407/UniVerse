"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CTAButtons() {
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      <Link href="/signup" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-7 text-[15px] shadow-lg shadow-primary/25")}>
        Get Started
        <ArrowRight aria-hidden />
      </Link>
      <Link href="/features" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 rounded-full bg-transparent px-7 text-[15px]")}>
        Explore Features
      </Link>
    </div>
  );
}
