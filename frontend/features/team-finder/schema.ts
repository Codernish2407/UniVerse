import { z } from "zod";
import { COLLAB_MODES, PROJECT_CATEGORIES } from "./constants";

export const opportunitySchema = z.object({
  title: z.string().trim().min(5, "Enter at least 5 characters").max(90),
  description: z.string().trim().min(20, "Describe the project in at least 20 characters").max(800),
  category: z.enum(PROJECT_CATEGORIES as [string, ...string[]], { message: "Select a category" }),
  skills: z.array(z.string()).min(1, "Select at least one required skill"),
  teamSize: z.coerce.number().int().min(2, "A team needs at least 2 people").max(10, "Keep teams to 10 or fewer"),
  mode: z.enum(COLLAB_MODES as [string, ...string[]]),
});
export type OpportunityValues = z.input<typeof opportunitySchema>;
