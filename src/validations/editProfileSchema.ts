import { z } from "zod";

const editProfileSchema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    phone: z.string().min(8, { message: "Invalid phone number" }),
    email: z.string().email({ message: "Invalid email address" }),
    avatar: z.string().optional()
})
type editProfileType = z.infer<typeof editProfileSchema >

export { editProfileSchema, type editProfileType }