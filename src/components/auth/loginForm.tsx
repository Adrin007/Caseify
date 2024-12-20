import { LoginSchema } from "@/schemas/validator"
import Image from "next/image"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorMessage } from "./errorMessage"
import { TailwindToast } from "../tailwindToast"
import { LoginAction } from "@/action/loginAction"
import { useTransition } from "react"
export const LoginForm = () => {

    const[isPending,setTransition] = useTransition()

    const { register, handleSubmit,formState: { errors } } = useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:""
        }
    });

    const submitCallback = (values:z.infer<typeof LoginSchema>) => {
        console.log(values)
        setTransition(()=>{
            LoginAction(values).then((data)=>{
                if(data){
                    TailwindToast({message:data.message,context:data.context})
                }
            })
        })
    }

    return (
        <div className="w-full mt-8 md:-mt-5 bg-[#E6E6FA] md:bg-white/40 md:backdrop-filter md:backdrop-blur-[90px] rounded-2xl px-1">

            <div className="flex flex-col items-center justify-center pt-10 gap-3 px-3">

                <form onSubmit={handleSubmit(submitCallback)} className="flex flex-col gap-3 w-full">
                    <input type="email" id="email" className="w-full py-3 px-4 rounded-2xl bg-[#fefefe] md:bg-[#F2F2F2] focus:outline-none shadow-inner" placeholder="Enter Email" {...register("email")} disabled={isPending}/>
                    {errors.email && <ErrorMessage message={errors.email.message}></ErrorMessage>}

                    <input type="password" id="password" className="px-4 w-full py-3 rounded-2xl bg-[#fefefe] md:bg-[#F2F2F2] focus:outline-none shadow-inner pt-3" placeholder="Enter Password" {...register("password")} disabled={isPending}/>
                    {errors.password && <ErrorMessage message={errors.password.message}></ErrorMessage>}

                    <div className="flex w-full items-end justify-end">
                        <h1 className="text-sm text-black/50">forgot password?</h1>
                    </div>

                    <div className="px-5 w-full">
                        <div className="h-px w-full bg-black/10 rounded-full md:hidden px-5"></div>
                    </div>

                    <button type="submit" className="w-full bg-[#6C48C5] py-3 rounded-2xl text-center mt-3 md:mt-0 mb-2 hover:bg-[#6C48C5]/80 transition-all duration-500" disabled={isPending}>
                        <h1 className="text-white">Login</h1>
                    </button>

                </form>

                <div className="w-full bg-[#fefefe] py-3 rounded-2xl text-center flex flex-row items-center justify-center gap-3 shadow-inner md:bg-[#F2F2F2]">
                    <Image src="/google.png" width={25} height={25} alt="google" />
                    <h1 className="text-black">Continue with Google</h1>
                </div>

                <div className="flex flex-row gap-3 mb-10 md:mb-7 w-full">

                    <div className="w-full bg-[#fefefe] py-3 rounded-2xl text-center flex flex-row items-center justify-center gap-3 px-4 shadow-inner md:bg-[#F2F2F2]">
                        <Image src="/x.png" width={25} height={25} alt="google" />
                        <h1 className="text-black">Facebook</h1>
                    </div>

                    <div className="w-full bg-[#fefefe] py-3 rounded-2xl text-center flex flex-row items-center justify-center gap-3 px-4 shadow-inner md:bg-[#F2F2F2]">
                        <Image src="/github.png" width={25} height={25} alt="google" />
                        <h1 className="text-black">Github</h1>
                    </div>

                </div>
            </div>
        </div>
    )
}