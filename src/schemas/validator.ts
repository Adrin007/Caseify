import * as z from "zod"

export const LoginSchema = z.object({
    email:z.string().email({message:"Email is required!"}),
    password:z.string().min(6,{message:"Password length should be > 5"})
})

export const RegisterSchema = z.object({
    email:z.string().email({message:"Email is required!"}),
    password:z.string().min(6,{message:"Password length should be > 5"}),
    confirmPassword:z.string().min(6,{message:"Password length should be > 5"})
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Oh no! passwords didn't match",
        path: ['confirmPassword']
      });
    }
})