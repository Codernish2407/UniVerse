import { z } from "zod";

export const listingSchema = z.object({
  title: z.string().trim().min(4, "Use at least 4 characters.").max(90, "Keep the title under 90 characters."),
  description: z.string().trim().min(12, "Add a little more detail.").max(1200, "Keep the description under 1,200 characters."),
  category: z.string().min(1, "Choose a category."),
  location: z.string().trim().min(2, "Enter an approximate location."),
  itemType: z.enum(["Lost", "Found"]).optional(),
  budget: z.string().max(50).optional(),
});
export type ListingFormValues = z.infer<typeof listingSchema>;

export const profileSchema = z.object({
  name: z.string().trim().min(2).max(60),
  email: z.string().email(),
  course: z.string().trim().min(2).max(100),
  graduationYear: z.string().regex(/^20\d{2}$/),
  bio: z.string().max(300),
  github: z.union([z.literal(""), z.string().url()]),
  linkedin: z.union([z.literal(""), z.string().url()]),
  portfolio: z.union([z.literal(""), z.string().url()]),
});
