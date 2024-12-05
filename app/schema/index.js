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

export const listingSchema = z.object({
  title: z.string().min(1, "Title is required"), // Title is now required
  description: z.string().max(280).optional(),
  endsAt: z.coerce.date().min(new Date(), "Ending date must be in the future"), // Ending date is required and must be in the future
  tags: z.array(z.string()).optional(),
  media: z
    .array(
      z.object({
        url: z.string().min(1, "Media URL is required"), // Media URL is required
        alt: z.string().optional(),
      })
    )
    .min(1, "At least one media item is required.")
    .max(8, "You can only add up to 8 media items."),
});
