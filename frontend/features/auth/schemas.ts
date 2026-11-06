import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Enter your email").email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
  remember: z.boolean(),
});
export type LoginValues = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().min(1, "Enter your email").email("Enter a valid email address"),
  password: z.string().min(8, "Use at least 8 characters"),
  confirmPassword: z.string().min(1, "Confirm your password"),
  universityId: z.string().min(1, "Select your university"),
  course: z.string().min(1, "Select your program"),
  graduationYear: z.coerce.number().int().min(2026, "Select a graduation year").max(2032),
}).refine((v) => v.password === v.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });
export type SignupValues = z.input<typeof signupSchema>;

export const forgotSchema = z.object({ email: z.string().min(1, "Enter your email").email("Enter a valid email address") });
