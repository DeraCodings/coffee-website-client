import { z } from "zod";

export const userFormSchema = z.object({
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be less than 15 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  email: z.string().email({ message: "Invalid email address" }),
  "shipping-address": z
    .string()
    .min(5, { message: "Shipping address is required" })
    .max(100, { message: "Shipping address is too long" }),
});

export type UserFormData = z.infer<typeof userFormSchema>;
