"use client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { FormField, inputCls } from "@/components/shared/FormField";
import { TagInput } from "@/components/shared/TagInput";
import { useToast } from "@/components/shared/Toaster";
import { useAuth } from "@/features/auth/AuthProvider";
import { surface } from "@/lib/ui";
import { profileSchema, type ProfileValues } from "./schema";

export function ProfileEdit() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileValues>({ resolver: zodResolver(profileSchema), defaultValues: user ? { ...user } : undefined });
  if (!user) return null;
  const sel = `${inputCls} appearance-none`;
  return (
    <PageContainer className="max-w-2xl">
      <PageHeader title="Edit profile" crumbs={[{ label: "Profile", href: "/profile" }, { label: "Edit" }]} />
      <form noValidate onSubmit={handleSubmit(async (v) => { await updateProfile(profileSchema.parse(v)); toast("Profile saved"); router.replace("/profile"); })} className={`${surface} space-y-4 p-4 sm:p-6`}>
        <FormField id="name" label="Display name" error={errors.name?.message}>{(p) => <input {...p} className={inputCls} {...register("name")} />}</FormField>
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField id="course" label="Course" error={errors.course?.message} className="sm:col-span-1">{(p) => <input {...p} className={inputCls} {...register("course")} />}</FormField>
          <FormField id="graduationYear" label="Graduation year" error={errors.graduationYear?.message}>{(p) => <input {...p} type="number" inputMode="numeric" className={inputCls} {...register("graduationYear")} />}</FormField>
          <FormField id="semester" label="Current semester" error={errors.semester?.message}>{(p) => <input {...p} type="number" inputMode="numeric" className={inputCls} {...register("semester")} />}</FormField>
        </div>
        <FormField id="bio" label="Bio" error={errors.bio?.message}>{(p) => <textarea {...p} rows={3} className={`${inputCls} h-auto py-2.5`} {...register("bio")} />}</FormField>
        <Controller control={control} name="skills" render={({ field }) => <div><p className="mb-1.5 text-sm font-medium">Skills</p><TagInput id="skills" label="Add a skill" placeholder="e.g. React, then press Enter" value={field.value ?? []} onChange={field.onChange} /></div>} />
        <Controller control={control} name="interests" render={({ field }) => <div><p className="mb-1.5 text-sm font-medium">Interests</p><TagInput id="interests" label="Add an interest" placeholder="e.g. Hackathons" value={field.value ?? []} onChange={field.onChange} /></div>} />
        <FormField id="github" label="GitHub URL" error={errors.github?.message}>{(p) => <input {...p} type="url" placeholder="https://github.com/username" className={inputCls} {...register("github")} />}</FormField>
        <FormField id="linkedin" label="LinkedIn URL" error={errors.linkedin?.message}>{(p) => <input {...p} type="url" placeholder="https://linkedin.com/in/username" className={inputCls} {...register("linkedin")} />}</FormField>
        <FormField id="portfolio" label="Portfolio URL" error={errors.portfolio?.message}>{(p) => <input {...p} type="url" placeholder="https://" className={inputCls} {...register("portfolio")} />}</FormField>
        <FormField id="availability" label="Collaboration availability">{(p) => <select {...p} className={sel} {...register("availability")}><option value="open">Open to teams</option><option value="limited">Limited time</option><option value="unavailable">Unavailable</option></select>}</FormField>
        <FormField id="collaborationPrefs" label="Collaboration preferences" error={errors.collaborationPrefs?.message}>{(p) => <input {...p} className={inputCls} placeholder="e.g. weekend sprints, async-first" {...register("collaborationPrefs")} />}</FormField>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><Button type="button" variant="outline" size="lg" onClick={() => router.back()}>Cancel</Button><Button type="submit" size="lg" disabled={isSubmitting}>{isSubmitting && <Loader2 className="animate-spin" aria-hidden />}Save changes</Button></div>
      </form>
    </PageContainer>
  );
}
