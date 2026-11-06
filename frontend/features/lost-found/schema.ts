import { z } from "zod";
import { LF_CATEGORIES } from "./constants";

export const itemSchema = z.object({
  title: z.string().trim().min(3, "Enter at least 3 characters").max(80, "Keep the title under 80 characters"),
  kind: z.enum(["lost", "found"]),
  category: z.enum(LF_CATEGORIES as [string, ...string[]], { message: "Select a category" }),
  description: z.string().trim().min(10, "Describe the item in at least 10 characters").max(500),
  location: z.string().trim().min(2, "Enter an approximate location"),
  date: z.string().min(1, "Select a date").refine((d) => new Date(d) <= new Date(), "The date can't be in the future"),
  contactMethod: z.enum(["in-app", "campus-desk"]),
});
export type ItemValues = z.infer<typeof itemSchema>;
