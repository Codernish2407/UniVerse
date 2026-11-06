import { z } from "zod";
const optionalUrl = z.string().trim().refine((v) => v === "" || /^https?:\/\/[^\s.]+\.[^\s]+$/.test(v), "Enter a full URL starting with http:// or https://");
export const profileSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  course: z.string().trim().min(2, "Enter your course"),
  graduationYear: z.coerce.number().int().min(2026, "Enter a valid year").max(2032, "Enter a valid year"),
  semester: z.coerce.number().int().min(1).max(12),
  bio: z.string().trim().max(300, "Keep your bio under 300 characters"),
  skills: z.array(z.string()), interests: z.array(z.string()),
  github: optionalUrl, linkedin: optionalUrl, portfolio: optionalUrl,
  availability: z.enum(["open", "limited", "unavailable"]),
  collaborationPrefs: z.string().trim().max(200),
});
export type ProfileValues = z.input<typeof profileSchema>;
