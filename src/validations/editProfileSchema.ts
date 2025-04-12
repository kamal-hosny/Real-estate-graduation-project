import { z } from "zod";

const editProfileSchema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    phone: z.string().min(8, { message: "Invalid phone number" }),
    email: z.string().email({ message: "Invalid email address" }),
    avatar: z.string().optional(),
    password: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val))
    .refine((val) => !val || val.length >= 8, {
      message: "Password must be at least 8 characters long",
    })
    .refine((val) => !val || /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => !val || /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((val) => !val || /[0-9]/.test(val), {
      message: "Password must contain at least one number",
    })
    .refine((val) => !val || /[^A-Za-z0-9]/.test(val), {
      message: "Password must contain at least one special character",
    }),
})
type editProfileType = z.infer<typeof editProfileSchema >

export { editProfileSchema, type editProfileType }