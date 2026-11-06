"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { FormField, inputCls } from "@/components/shared/FormField";
import { ErrorState } from "@/components/shared/ErrorState";
import { useToast } from "@/components/shared/Toaster";
import { useAuth } from "@/features/auth/AuthProvider";
import { lostFound } from "@/services";
import { makeId } from "@/services/mock/collection";
import { surface } from "@/lib/ui";
import type { LostFoundCategory, LostFoundItem } from "@/types/domain";
import { LF_CATEGORIES } from "./constants";
import { itemSchema, type ItemValues } from "./schema";

const MAX_IMAGE_BYTES = 400_000;
const today = () => new Date().toISOString().slice(0, 10);

export function ItemForm() {
  const router = useRouter();
  const editId = useSearchParams().get("edit");
  const { user } = useAuth();
  const { toast } = useToast();
  const [existing, setExisting] = useState<LostFoundItem | null>(null);
  const [image, setImage] = useState<string | undefined>();
  const [imageError, setImageError] = useState<string | null>(null);
  const [blocked, setBlocked] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ItemValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: { title: "", kind: "lost", category: "" as LostFoundCategory, description: "", location: "", date: today(), contactMethod: "in-app" },
  });

  useEffect(() => {
    if (!editId || !user) return;
    void lostFound.get(editId).then((it) => {
      if (!it || it.ownerId !== user.id) { setBlocked(true); return; }
      setExisting(it); setImage(it.imageDataUrl);
      reset({ title: it.title, kind: it.kind, category: it.category, description: it.description, location: it.location, date: it.date, contactMethod: it.contactMethod });
    });
  }, [editId, user, reset]);

  const onFile = (file?: File) => {
    setImageError(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) return setImageError("Choose an image file.");
    if (file.size > MAX_IMAGE_BYTES) return setImageError("Image is too large for demo storage (max 400 KB).");
    const r = new FileReader(); r.onload = () => setImage(String(r.result)); r.readAsDataURL(file);
  };

  const onSubmit = async (v: ItemValues) => {
    if (!user) return;
    const data = { ...v, category: v.category as LostFoundCategory, imageDataUrl: image };
    if (existing) { await lostFound.update(existing.id, data); toast("Listing updated"); router.replace(`/lost-found/${existing.id}`); return; }
    const item: LostFoundItem = { ...data, id: makeId("lf"), universityId: user.universityId, ownerId: user.id, ownerName: user.name, status: "open", createdAt: new Date().toISOString(), ownershipRequests: [], reported: false, isSample: false };
    await lostFound.create(item); toast("Listing created"); router.replace(`/lost-found/${item.id}`);
  };

  if (blocked) return <PageContainer><ErrorState message="You can only edit your own listings." /></PageContainer>;
  const sel = `${inputCls} appearance-none`;
  return (
    <PageContainer className="max-w-2xl">
      <PageHeader title={existing ? "Edit listing" : "Create listing"} crumbs={[{ label: "Lost & Found", href: "/lost-found" }, { label: existing ? "Edit" : "Create" }]} description="Don't include phone numbers or room numbers. Contact happens in-app." />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className={`${surface} space-y-4 p-4 sm:p-6`}>
        <FormField id="title" label="Item title" error={errors.title?.message}>{(p) => <input {...p} className={inputCls} placeholder="e.g. Blue water bottle" {...register("title")} />}</FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField id="kind" label="Lost or found" error={errors.kind?.message}>{(p) => <select {...p} className={sel} {...register("kind")}><option value="lost">I lost this</option><option value="found">I found this</option></select>}</FormField>
          <FormField id="category" label="Category" error={errors.category?.message}>{(p) => <select {...p} className={sel} {...register("category")}><option value="">Select…</option>{LF_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>}</FormField>
        </div>
        <FormField id="description" label="Description" error={errors.description?.message} hint="Colour, brand, marks. Keep one detail back to verify the real owner.">{(p) => <textarea {...p} rows={4} className={`${inputCls} h-auto py-2.5`} {...register("description")} />}</FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField id="location" label="Approximate location" error={errors.location?.message}>{(p) => <input {...p} className={inputCls} placeholder="e.g. Central Library" {...register("location")} />}</FormField>
          <FormField id="date" label="Date" error={errors.date?.message}>{(p) => <input {...p} type="date" max={today()} className={inputCls} {...register("date")} />}</FormField>
        </div>
        <FormField id="contactMethod" label="Preferred contact method" error={errors.contactMethod?.message}>{(p) => <select {...p} className={sel} {...register("contactMethod")}><option value="in-app">In-app request (demo)</option><option value="campus-desk">Hand over via a campus help desk</option></select>}</FormField>
        <FormField id="image" label="Photo (optional)" error={imageError ?? undefined} hint="Stored only in this browser for the demo. It is not uploaded anywhere.">{(p) => <input {...p} type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} className="block w-full text-sm file:mr-3 file:h-10 file:rounded-lg file:border-0 file:bg-hover file:px-4 file:text-foreground" />}</FormField>
        {image && <div className="relative w-fit"><img src={image} alt="Selected item preview" className="h-28 rounded-xl object-cover" /><button type="button" aria-label="Remove photo" onClick={() => setImage(undefined)} className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-elevated ring-1 ring-border"><X className="size-4" aria-hidden /></button></div>}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><Button type="button" variant="outline" size="lg" onClick={() => router.back()}>Cancel</Button><Button type="submit" size="lg" disabled={isSubmitting}>{isSubmitting && <Loader2 className="animate-spin" aria-hidden />}{existing ? "Save changes" : "Publish listing"}</Button></div>
      </form>
    </PageContainer>
  );
}
