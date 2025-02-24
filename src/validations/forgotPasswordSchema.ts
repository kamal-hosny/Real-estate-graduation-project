import { z } from "zod";

const forgotPasswordSchema = z.object({
    email: z.string().min(1, {
        message: "Email address is required",
    })
})

type forgotPasswordType = z.infer<typeof forgotPasswordSchema>

export { forgotPasswordSchema, type forgotPasswordType }