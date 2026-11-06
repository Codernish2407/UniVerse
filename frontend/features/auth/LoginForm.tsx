"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, inputCls } from "@/components/shared/FormField";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { auth } from "@/services";
import { writeStore } from "@/lib/storage";
import { useAuth } from "./AuthProvider";
import { loginSchema, type LoginValues } from "./schemas";

const safeNext = (n: string | null) => (n && n.startsWith("/") && !n.startsWith("//") ? n : "/dashboard");

export function LoginForm() {
  const router = useRouter();
  const next = safeNext(useSearchParams().get("next"));
  const { refresh } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [demoLoading, setDemoLoading] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "", remember: true } });

  const finish = async () => { await refresh(); router.replace(next); };
  const onSubmit = async (v: LoginValues) => {
    setError(null);
    try { writeStore("remember", v.remember); await auth.signIn(v.email, v.password); await finish(); }
    catch { setError("We couldn't sign you in. Please try again."); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <FormField id="email" label="Email" error={errors.email?.message}>{(p) => <input {...p} type="email" autoComplete="email" placeholder="you@example.com" className={inputCls} {...register("email")} />}</FormField>
      <FormField id="password" label="Password" error={errors.password?.message} hint="Demo mode: your password is not checked or stored.">{(p) => <PasswordInput {...p} autoComplete="current-password" {...register("password")} />}</FormField>
      <div className="flex items-center justify-between gap-3 text-sm">
        <label className="flex min-h-11 items-center gap-2"><input type="checkbox" className="size-4 accent-primary" {...register("remember")} />Remember me</label>
        <Link href="/forgot-password" className="text-primary-soft underline underline-offset-4 hover:no-underline">Forgot password?</Link>
      </div>
      {error && <p role="alert" className="rounded-xl border border-error/30 bg-error/10 px-3 py-2 text-sm text-error-soft">{error}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>{isSubmitting && <Loader2 className="animate-spin" aria-hidden />}Sign in</Button>
      <div className="relative py-1 text-center text-xs text-subtle"><span className="relative z-10 bg-card px-2">or</span><span aria-hidden className="absolute inset-x-0 top-1/2 border-t border-border" /></div>
      <Button type="button" variant="outline" size="lg" className="w-full" disabled={demoLoading}
        onClick={async () => { setDemoLoading(true); await auth.signInDemo(); await finish(); }}>
        {demoLoading && <Loader2 className="animate-spin" aria-hidden />}Continue with demo account
      </Button>
    </form>
  );
}
