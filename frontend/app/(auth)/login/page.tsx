import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/AuthCard";
import { LoginForm } from "@/features/auth/LoginForm";

export const metadata: Metadata = { title: "Sign in" };
export default function LoginPage() {
  return (
    <AuthCard title="Welcome back" subtitle="Sign in to continue to your UniVerse." footer={<>New here? <Link href="/signup" className="text-primary-soft underline underline-offset-4 hover:no-underline">Create an account</Link></>}>
      <Suspense><LoginForm /></Suspense>
    </AuthCard>
  );
}
