import { z } from "zod";

// form validation

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .regex(/^[\w\-.]+@(stud\.)?noroff\.no$/, {
      message:
        "Email must be a valid Noroff email (e.g., test@noroff.no or test@stud.noroff.no)",
    }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Username is required" })
      .regex(/^[\w]+$/, { message: "No special characters allowed" }),
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .regex(/^[\w\-.]+@(stud\.)?noroff\.no$/, {
        message:
          "Email must be a valid Noroff email (e.g., test@noroff.no or test@stud.noroff.no)",
      }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // Connect error message to confirmPassword
  });
