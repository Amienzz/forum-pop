import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required").max(50, "First name too long"),
    lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name too long"),
    email: z.string().trim().min(1, "Email is required").email("Invalid email address").max(255, "Email too long"),
    phone: z
      .string()
      .trim()
      .min(11, "Phone number must be at least 11 digits")
      .max(15, "Phone number too long")
      .regex(/^[0-9+\-() ]+$/, "Invalid phone number format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password too long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    terms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
