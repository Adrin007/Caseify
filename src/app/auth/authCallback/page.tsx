/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useEffect} from "react"
import { useRouter } from "next/navigation"
import { CgSpinner } from "react-icons/cg";

const authCallback = () => {
    const router = useRouter()
    const localConfigId = localStorage.getItem("configId")
    useEffect(()=>{
        if(localConfigId){
            router.push(`/configure/preview/?id=${localConfigId}`)
            localStorage.removeItem("configId")
        }
        else{
            router.push("/")
        }
    },[])
  return (
    <div className="w-full min-h-screen h-[100vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5">
            <CgSpinner className="animate-spin w-[40px] h-[40px] text-[#6C48C5]"/>
            <h1>Re-Routing.... Hold on a second!</h1>
        </div>
    </div>
  )
}

export default authCallback