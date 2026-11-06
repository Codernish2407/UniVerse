"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { FormField, inputCls } from "@/components/shared/FormField";
import { useToast } from "@/components/shared/Toaster";
import { useAuth } from "@/features/auth/AuthProvider";
import { roommates } from "@/services";
import { makeId } from "@/services/mock/collection";
import { surface } from "@/lib/ui";
import { cn } from "@/lib/utils";
import type { AccommodationType, RoommateListing, SharingPref, SleepSchedule, StudyHabit } from "@/types/domain";
import { ACCOMMODATIONS, LIFESTYLE_TAGS, SHARING, SLEEP, STUDY } from "./constants";
import { roommateSchema, type RoommateValues } from "./schema";

/** Creates the student's roommate listing, or edits it if one already exists. */
export function RoommateForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [existing, setExisting] = useState<RoommateListing | null>(null);
  const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RoommateValues>({
    resolver: zodResolver(roommateSchema),
    defaultValues: { course: user?.course ?? "", accommodation: "Hostel", budgetMin: 5000, budgetMax: 8000, cleanliness: 3, sleep: "Flexible", study: "Flexible", sharing: "Double", lifestyle: [], available: true, about: "" },
  });
  useEffect(() => {
    if (!user) return;
    void roommates.list().then((all) => { const m = all.find((r) => r.ownerId === user.id); if (m) { setExisting(m); reset({ ...m }); } });
  }, [user, reset]);
  const sel = `${inputCls} appearance-none`;
  const onSubmit = async (v: RoommateValues) => {
    if (!user) return;
    const p = roommateSchema.parse(v);
    const data = { course: p.course, accommodation: p.accommodation as AccommodationType, budgetMin: p.budgetMin, budgetMax: p.budgetMax, cleanliness: p.cleanliness as RoommateListing["cleanliness"], sleep: p.sleep as SleepSchedule, study: p.study as StudyHabit, sharing: p.sharing as SharingPref, lifestyle: p.lifestyle, available: p.available, about: p.about };
    if (existing) { await roommates.update(existing.id, data); toast("Listing updated"); router.replace(`/roommate-finder/${existing.id}`); return; }
    // Only a shortened display name is public; no contact details are collected.
    const [first, ...rest] = user.name.split(" ");
    const item: RoommateListing = { ...data, id: makeId("rm"), universityId: user.universityId, ownerId: user.id, displayName: rest.length ? `${first} ${rest[rest.length - 1][0]}.` : first, connectionRequests: [], createdAt: new Date().toISOString(), isSample: false };
    await roommates.create(item); toast("Listing created"); router.replace(`/roommate-finder/${item.id}`);
  };
  return (
    <PageContainer className="max-w-2xl">
      <PageHeader title={existing ? "Edit your listing" : "Create your listing"} crumbs={[{ label: "Roommate Finder", href: "/roommate-finder" }, { label: existing ? "Edit" : "Create" }]} description="Only a short display name and these preferences are shown. Don't add phone numbers or room numbers." />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className={`${surface} space-y-4 p-4 sm:p-6`}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField id="course" label="Course" error={errors.course?.message}>{(p) => <input {...p} className={inputCls} {...register("course")} />}</FormField>
          <FormField id="accommodation" label="Accommodation type">{(p) => <select {...p} className={sel} {...register("accommodation")}>{ACCOMMODATIONS.map((a) => <option key={a}>{a}</option>)}</select>}</FormField>
          <FormField id="budgetMin" label="Budget from (₹/month)" error={errors.budgetMin?.message}>{(p) => <input {...p} type="number" inputMode="numeric" className={inputCls} {...register("budgetMin")} />}</FormField>
          <FormField id="budgetMax" label="Budget up to (₹/month)" error={errors.budgetMax?.message}>{(p) => <input {...p} type="number" inputMode="numeric" className={inputCls} {...register("budgetMax")} />}</FormField>
          <FormField id="sleep" label="Sleep schedule">{(p) => <select {...p} className={sel} {...register("sleep")}>{SLEEP.map((a) => <option key={a}>{a}</option>)}</select>}</FormField>
          <FormField id="study" label="Study habits">{(p) => <select {...p} className={sel} {...register("study")}>{STUDY.map((a) => <option key={a}>{a}</option>)}</select>}</FormField>
          <FormField id="sharing" label="Room sharing">{(p) => <select {...p} className={sel} {...register("sharing")}>{SHARING.map((a) => <option key={a}>{a}</option>)}</select>}</FormField>
          <FormField id="cleanliness" label="Cleanliness (1 relaxed, 5 very tidy)">{(p) => <select {...p} className={sel} {...register("cleanliness")}>{[1, 2, 3, 4, 5].map((a) => <option key={a}>{a}</option>)}</select>}</FormField>
        </div>
        <Controller control={control} name="lifestyle" render={({ field }) => (
          <fieldset><legend className="mb-1.5 text-sm font-medium">Lifestyle</legend><div className="flex flex-wrap gap-2">{LIFESTYLE_TAGS.map((s) => { const on = field.value.includes(s); return (
            <button key={s} type="button" aria-pressed={on} onClick={() => field.onChange(on ? field.value.filter((x: string) => x !== s) : [...field.value, s])} className={cn("h-9 rounded-full border px-3.5 text-sm", on ? "border-primary bg-primary/15" : "border-border text-muted-foreground hover:bg-hover")}>{s}</button>); })}</div></fieldset>)} />
        <FormField id="about" label="About you" error={errors.about?.message}>{(p) => <textarea {...p} rows={3} className={`${inputCls} h-auto py-2.5`} {...register("about")} />}</FormField>
        <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" className="size-4 accent-primary" {...register("available")} />I&apos;m looking for a roommate now</label>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><Button type="button" variant="outline" size="lg" onClick={() => router.back()}>Cancel</Button><Button type="submit" size="lg" disabled={isSubmitting}>{isSubmitting && <Loader2 className="animate-spin" aria-hidden />}{existing ? "Save changes" : "Publish listing"}</Button></div>
      </form>
    </PageContainer>
  );
}
