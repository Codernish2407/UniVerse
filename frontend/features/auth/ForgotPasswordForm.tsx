"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, inputCls } from "@/components/shared/FormField";
import { forgotSchema } from "./schemas";
import type { z } from "zod";

/** Intentionally does NOT claim an email was sent: recovery needs the real backend. */
export function ForgotPasswordForm() {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof forgotSchema>>({ resolver: zodResolver(forgotSchema) });
  if (done) return (
    <div role="status" className="flex gap-3 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm">
      <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
      <p>Password recovery isn&apos;t available in demo mode, and no email was sent. Demo accounts don&apos;t have real passwords, so you can sign in with any valid email or use the demo account.</p>
    </div>
  );
  return (
    <form onSubmit={handleSubmit(() => setDone(true))} noValidate className="space-y-4">
      <FormField id="email" label="Email" error={errors.email?.message}>{(p) => <input {...p} type="email" autoComplete="email" className={inputCls} {...register("email")} />}</FormField>
      <Button type="submit" size="lg" className="w-full">Check recovery options</Button>
    </form>
  );
}
