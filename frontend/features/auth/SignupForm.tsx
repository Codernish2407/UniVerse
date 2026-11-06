"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, inputCls } from "@/components/shared/FormField";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { UNIVERSITIES } from "@/constants/universities";
import { auth } from "@/services";
import { useAuth } from "./AuthProvider";
import { signupSchema, type SignupValues } from "./schemas";

const YEARS = [2026, 2027, 2028, 2029, 2030, 2031];

export function SignupForm() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", universityId: UNIVERSITIES[0].id, course: "", graduationYear: 2029 },
  });
  const selectedUni = useWatch({ control, name: "universityId" });
  const uni = UNIVERSITIES.find((u) => u.id === selectedUni) ?? UNIVERSITIES[0];

  const onSubmit = async (v: SignupValues) => {
    setError(null);
    try {
      // Password is validated here but intentionally NOT passed to the mock service or stored.
      await auth.signUp({ name: v.name, email: v.email, course: v.course, graduationYear: Number(v.graduationYear), universityId: v.universityId });
      await refresh(); router.replace("/dashboard");
    } catch { setError("We couldn't create your demo account. Please try again."); }
  };
  const sel = `${inputCls} appearance-none`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <FormField id="name" label="Full name" error={errors.name?.message}>{(p) => <input {...p} autoComplete="name" className={inputCls} {...register("name")} />}</FormField>
      <FormField id="email" label="Email" error={errors.email?.message}>{(p) => <input {...p} type="email" autoComplete="email" className={inputCls} {...register("email")} />}</FormField>
      <FormField id="password" label="Password" error={errors.password?.message} hint="Demo mode: not stored.">{(p) => <PasswordInput {...p} autoComplete="new-password" {...register("password")} />}</FormField>
      <FormField id="confirmPassword" label="Confirm password" error={errors.confirmPassword?.message}>{(p) => <PasswordInput {...p} autoComplete="new-password" {...register("confirmPassword")} />}</FormField>
      <FormField id="universityId" label="University" error={errors.universityId?.message}>{(p) => <select {...p} className={sel} {...register("universityId")}>{UNIVERSITIES.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}</select>}</FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="course" label="Course / program" error={errors.course?.message}>{(p) => <select {...p} className={sel} {...register("course")}><option value="">Select…</option>{uni.programs.map((c) => <option key={c}>{c}</option>)}</select>}</FormField>
        <FormField id="graduationYear" label="Graduation year" error={errors.graduationYear?.message}>{(p) => <select {...p} className={sel} {...register("graduationYear")}>{YEARS.map((y) => <option key={y}>{y}</option>)}</select>}</FormField>
      </div>
      {error && <p role="alert" className="rounded-xl border border-error/30 bg-error/10 px-3 py-2 text-sm text-error-soft">{error}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>{isSubmitting && <Loader2 className="animate-spin" aria-hidden />}Create demo account</Button>
    </form>
  );
}
