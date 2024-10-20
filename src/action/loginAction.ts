"use server"
import { LoginSchema } from "@/schemas/validator";
import * as z from "zod"

export const LoginAction = async(values:z.infer<typeof LoginSchema>) => {
    const validatedValues = LoginSchema.safeParse(values)
    if(!validatedValues.success){
        return {message:"Given credentials are invalid",context:"fail"}
    }
    return {message:"Good to have you back! Let's Go",context:"success"}
}