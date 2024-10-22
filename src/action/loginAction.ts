"use server"
import { LoginSchema } from "@/schemas/validator";
import * as z from "zod"
import { signIn } from "../../auth";
import {AuthError} from 'next-auth'

export const LoginAction = async(values:z.infer<typeof LoginSchema>) => {
    const validatedValues = LoginSchema.safeParse(values)
    if(!validatedValues.success){
        return {message:"Given credentials are invalid",context:"fail"}
    }

    const {email,password} = validatedValues.data

    try {

        await signIn("credentials",{email,password,redirectTo:"/dashboard"})

    } catch (error) {

        if (error instanceof AuthError){

            switch(error.type){
                case "CredentialsSignin":
                    return {message:"Invalid Credentials!",context:"fail"}
                default:
                    return {message:"Something Went Wrong!",context:"fail"}
            }

        }

        throw error

    }
}