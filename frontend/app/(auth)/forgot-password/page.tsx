import Link from "next/link";
import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/AuthCard";
import { ForgotPasswordForm } from "@/features/auth/ForgotPasswordForm";

export const metadata: Metadata = { title: "Forgot password" };
export default function ForgotPasswordPage() {
  return (
    <AuthCard title="Reset your password" subtitle="Enter your email to see your recovery options." footer={<Link href="/login" className="text-primary-soft underline underline-offset-4 hover:no-underline">Back to sign in</Link>}>
      <ForgotPasswordForm />
    </AuthCard>
  );
}
