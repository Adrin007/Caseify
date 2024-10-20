"use server"
import { RegisterSchema } from "@/schemas/validator";
import { z } from "zod";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db";

export const RegisterAction = async(values:z.infer<typeof RegisterSchema>) => {
    const validatedValues = RegisterSchema.safeParse(values)

    if(!validatedValues.success){
        return {message:"Something went wrong!",context:"fail"}
    }

    const {email,password}= validatedValues.data

    const userEmail = email

    const hashedPassword = await bcrypt.hash(password,10)

    const doesAlreadyExist = await db.user.findUnique({where:{email}})

    if(doesAlreadyExist){
        return {message:"This email is already taken",context:"fail"}
    }

    await db.user.create({
        data:{
            email:userEmail,
            password:hashedPassword
        }

    })
    return {message:"Account created successfully!",context:"success"}
}