import Link from "next/link";
import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/AuthCard";
import { SignupForm } from "@/features/auth/SignupForm";

export const metadata: Metadata = { title: "Create account" };
export default function SignupPage() {
  return (
    <AuthCard title="Create your account" subtitle="Set up a demo profile. Nothing leaves your browser." footer={<>Already have an account? <Link href="/login" className="text-primary-soft underline underline-offset-4 hover:no-underline">Sign in</Link></>}>
      <SignupForm />
    </AuthCard>
  );
}
