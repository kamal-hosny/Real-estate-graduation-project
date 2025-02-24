import { z } from "zod";

const createNewPasswordSchema = z.object({
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: "Password should contain at least 1 special character",
    }),
    confirmPassword: z
    .string()
    .min(1, { message: "Confirm Password is required" }),
}).refine((input) => input.password === input.confirmPassword, {
    message: "Password and Confirm Password do not match",
    path: ["confirmPassword"],
  });


  
type createNewPasswordType = z.infer<typeof createNewPasswordSchema>;

export { createNewPasswordSchema, type createNewPasswordType };
