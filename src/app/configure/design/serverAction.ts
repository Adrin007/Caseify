"use server"
import { db } from "@/lib/db"
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from "@prisma/client"

export type saveCaseConfigArgs={color:CaseColor,material:CaseMaterial,finish:CaseFinish,model:PhoneModel,configID:string}
export const saveCaseConfig = async({color,material,finish,model,configID}:saveCaseConfigArgs) => {
    await db.configure.update({
        where:{id:configID},
        data:{color,material,finish,model}
    })
}