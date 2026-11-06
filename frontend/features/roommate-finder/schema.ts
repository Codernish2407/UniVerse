import { z } from "zod";
import { ACCOMMODATIONS, SHARING, SLEEP, STUDY } from "./constants";

export const roommateSchema = z.object({
  course: z.string().trim().min(2, "Enter your course"),
  accommodation: z.enum(ACCOMMODATIONS as [string, ...string[]]),
  budgetMin: z.coerce.number().int().min(0, "Enter a valid amount"),
  budgetMax: z.coerce.number().int().min(0, "Enter a valid amount"),
  cleanliness: z.coerce.number().int().min(1).max(5),
  sleep: z.enum(SLEEP as [string, ...string[]]),
  study: z.enum(STUDY as [string, ...string[]]),
  sharing: z.enum(SHARING as [string, ...string[]]),
  lifestyle: z.array(z.string()),
  available: z.boolean(),
  about: z.string().trim().min(10, "Write at least 10 characters").max(300),
}).refine((v) => v.budgetMax >= v.budgetMin, { path: ["budgetMax"], message: "Maximum must be at least the minimum" });
export type RoommateValues = z.input<typeof roommateSchema>;
