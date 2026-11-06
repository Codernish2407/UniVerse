"use client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { FormField, inputCls } from "@/components/shared/FormField";
import { useToast } from "@/components/shared/Toaster";
import { useAuth } from "@/features/auth/AuthProvider";
import { teams } from "@/services";
import { makeId } from "@/services/mock/collection";
import { surface } from "@/lib/ui";
import { cn } from "@/lib/utils";
import type { CollabMode, ProjectCategory, TeamOpportunity } from "@/types/domain";
import { COLLAB_MODES, PROJECT_CATEGORIES, SKILL_OPTIONS } from "./constants";
import { opportunitySchema, type OpportunityValues } from "./schema";

export function OpportunityForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<OpportunityValues>({
    resolver: zodResolver(opportunitySchema), defaultValues: { title: "", description: "", category: "", skills: [], teamSize: 4, mode: "hybrid" },
  });
  const sel = `${inputCls} appearance-none`;
  const onSubmit = async (v: OpportunityValues) => {
    if (!user) return;
    const parsed = opportunitySchema.parse(v);
    const t: TeamOpportunity = { id: makeId("tm"), universityId: user.universityId, ownerId: user.id, ownerName: user.name, title: parsed.title, description: parsed.description, category: parsed.category as ProjectCategory, skills: parsed.skills, teamSize: parsed.teamSize, mode: parsed.mode as CollabMode, applicants: [], status: "open", createdAt: new Date().toISOString(), isSample: false };
    await teams.create(t); toast("Opportunity posted"); router.replace(`/team-finder/${t.id}`);
  };
  return (
    <PageContainer className="max-w-2xl">
      <PageHeader title="Post a team opportunity" crumbs={[{ label: "Team Finder", href: "/team-finder" }, { label: "Post" }]} description="Describe what you're building and who you need." />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className={`${surface} space-y-4 p-4 sm:p-6`}>
        <FormField id="title" label="Project title" error={errors.title?.message}>{(p) => <input {...p} className={inputCls} {...register("title")} />}</FormField>
        <FormField id="description" label="Description" error={errors.description?.message}>{(p) => <textarea {...p} rows={5} className={`${inputCls} h-auto py-2.5`} {...register("description")} />}</FormField>
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField id="category" label="Category" error={errors.category?.message}>{(p) => <select {...p} className={sel} {...register("category")}><option value="">Select…</option>{PROJECT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>}</FormField>
          <FormField id="teamSize" label="Team size" error={errors.teamSize?.message}>{(p) => <input {...p} type="number" min={2} max={10} inputMode="numeric" className={inputCls} {...register("teamSize")} />}</FormField>
          <FormField id="mode" label="Collaboration mode" error={errors.mode?.message}>{(p) => <select {...p} className={sel} {...register("mode")}>{COLLAB_MODES.map((c) => <option key={c}>{c}</option>)}</select>}</FormField>
        </div>
        <Controller control={control} name="skills" render={({ field }) => (
          <fieldset aria-describedby={errors.skills ? "skills-err" : undefined}><legend className="mb-1.5 text-sm font-medium">Required skills</legend>
            <div className="flex flex-wrap gap-2">{SKILL_OPTIONS.map((s) => { const on = field.value.includes(s); return (
              <button key={s} type="button" aria-pressed={on} onClick={() => field.onChange(on ? field.value.filter((x: string) => x !== s) : [...field.value, s])}
                className={cn("h-9 rounded-full border px-3.5 text-sm", on ? "border-primary bg-primary/15" : "border-border text-muted-foreground hover:bg-hover")}>{s}</button>); })}</div>
            {errors.skills && <p id="skills-err" role="alert" className="mt-1.5 text-xs text-error-soft">{errors.skills.message}</p>}</fieldset>)} />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><Button type="button" variant="outline" size="lg" onClick={() => router.back()}>Cancel</Button><Button type="submit" size="lg" disabled={isSubmitting}>{isSubmitting && <Loader2 className="animate-spin" aria-hidden />}Post opportunity</Button></div>
      </form>
    </PageContainer>
  );
}
