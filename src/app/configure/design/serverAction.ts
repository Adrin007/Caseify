"use server"
import { db } from "@/lib/db"

export type saveCaseConfigArgs={color:string,material:string,finish:string,model:string,configID:string}
export const saveCaseConfig = async({color,material,finish,model,configID}:saveCaseConfigArgs) => {
    await db.configure.update({
        where:{id:configID},
        data:{color,material,finish,model}
    })
}