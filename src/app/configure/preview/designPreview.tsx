/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import PhoneSkel from '@/components/phoneSkel'
import { Configure } from '@prisma/client'
import { FaAsterisk, FaCheck, FaChevronDown } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import Confetti from 'react-dom-confetti'
import { BASE_PRICE, COLORS, CURRENCIES, FINISHES, MATERIALS, MODELS } from '@/components/optionsData';
import { FaApple } from "react-icons/fa";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EU, IN, US } from 'country-flag-icons/react/3x2';
import { formatPrice } from '@/lib/utils';
import { CgSpinner } from 'react-icons/cg';
import { FaArrowRightLong } from 'react-icons/fa6';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ConfigurePaymentSession } from './serverAction';
import { TailwindToast } from '@/components/tailwindToast';
import { env } from 'process';
interface pageProps {
    orderData: Configure
}
const PreviewPage = ({ orderData }: pageProps) => {
    const [showConfetti, setShowConfetti] = useState(false)
    const caseColor = orderData.color
    const caseTw = COLORS.find((color) => color.value === caseColor)?.tw
    const caseModelValue = orderData.model
    const caseModelLabel = MODELS.find((model) => model.value === caseModelValue)?.label
    const caseMaterialValue = orderData.material
    const caseMaterialLabel = MATERIALS.find((material) => material.value === caseMaterialValue)?.label
    const caseMaterialPrice = MATERIALS.find((material) => material.value === caseMaterialValue)?.price
    const caseFinishValue = orderData.finish
    const caseFinishLabel = FINISHES.find((finish) => finish.value === caseFinishValue)?.label
    const caseFinishPrice = FINISHES.find((finish) => finish.value === caseFinishValue)?.price
    const [isCurrencyDropDownOpen, setCurrencyDropDownOpen] = useState(false)
    const [currency, setCurency] = useState("inr")
    const [isLoading, setIsLoading] = useState(false)
    const Router = useRouter()
    const {mutate:createPaymentSession} = useMutation({
        mutationKey:["get-checkout-session"],
        mutationFn:ConfigurePaymentSession,
        onSuccess:({url})=>{
            if(url){
                if(url == "http://localhost:3000/auth/login" || url == "https://caseify-v19.vercel.app/auth/login"){
                    TailwindToast({message:"Login/Resister to Continue",context:"none"})
                    localStorage.setItem("configId",orderData.id)
                }
                Router.push(url)
            }
            else{
                throw new Error("Something went wrong in preview/serverAction")
            }
        },
        onError:()=>{
            setIsLoading(false)
            TailwindToast({message:"Something went wrong in Payment Gateway.",context:"fail"})
        }
    })
    useEffect(() => setShowConfetti(true),[])
    const confettiConfig = {
        angle: 180,
        spread: 360,
        startVelocity: 25,
        elementCount: 300,
        dragFriction: 0.12,
        duration: 3000,
        stagger: 3,
        perspective: "500px",
        colors: ["#f00", "#0f0", "#00f"]
    }
    return (
        <div className='w-full'>
            <div className='pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center z-20'>
                <Confetti active={showConfetti} config={confettiConfig} />
            </div>
            <div className='-mt-5 md:mt-10 grid grid-row-2 md:grid-cols-3 w-full gap-10'>
                <div className='w-full md:-mt-10 px-9 z-10 flex items-center justify-center'>
                    <PhoneSkel ImgSRC={orderData.croppedImageUrl!}></PhoneSkel>
                </div>
                <div className="md:col-span-2 bg-gray-50 md:px-4 md:py-4 px-3 py-5 w-full flex flex-col rounded-2xl border-2 border-zinc-600/30">
                    <div className='flex flex-col gap-1'>
                        <div className='flex flex-row items-center justify-between'>
                            <h1 className='md:text-4xl text-2xl font-semibold'>Your {caseModelLabel} Case</h1>
                            <div>
                                <FaAsterisk className='rotate-90 text-[#6C48C5] w-5 h-5 hover:-rotate-90 transition-all duration-700 ease-in-out' />
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-start gap-1'>
                            <FaCheck className='text-[#6C48C5]' />
                            <h1>In Stock and ready to ship</h1>
                        </div>
                    </div>
                    <div className='w-full h-px bg-zinc-600/30 my-[0.7rem]' />
                    <div className='grid grig-row-2 md:grid-cols-2 gap-3 w-full'>
                        <div className='w-full'>
                            <p className='font-semibold text-zinc-950'>Highlights</p>
                            <ol className='mt-2 text-zinc-700 list-disc list-inside'>
                                <li>Wireless charging compatible</li>
                                <li>TPU shock absorption</li>
                                <li>Recycled packaging materials</li>
                                <li>5 year print warranty</li>
                            </ol>
                        </div>
                        <div className='w-full'>
                            <p className='font-semibold text-zinc-950'>Materials</p>
                            <ol className='mt-2 text-zinc-700 list-disc list-inside'>
                                <li>High-quality, durable material</li>
                                <li>Scratch and resistant coating</li>
                                <li>Shock-absorbent design</li>
                                <li>Environmentally friendly</li>
                            </ol>
                        </div>
                    </div>
                    <div className='w-full h-px bg-zinc-600/30 my-[0.7rem]' />
                    <div>
                        <h1 className='text-xl font-semibold'>Product Details</h1>
                        <div className='mt-2 flex flex-col gap-1'>
                            <div className='flex flex-row gap-2 items-center justify-start'>
                                <h1>Case color : </h1>
                                <div className={`w-4 h-4 rounded-full bg-${caseTw} border-1 border-zinc-600`} />
                                <h1>( {caseColor} )</h1>
                            </div>
                            <div className='flex flex-row gap-2 items-center justify-start'>
                                <h1>Case model : </h1>
                                <div className='flex flex-row items-center gap-1'>
                                    <h1>{caseModelLabel}</h1>
                                    <FaApple className='mb-[1.7px] text-zinc-800 w-4 h-4' />
                                </div>
                            </div>
                            <div className='flex flex-row gap-2 items-center justify-start'>
                                <h1>Material : </h1>
                                <h1>{caseMaterialLabel}</h1>
                            </div>
                            <div className='flex flex-row gap-2 items-center justify-start'>
                                <h1>Finish : </h1>
                                <h1>{caseFinishLabel}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gray-50 mt-5 rounded-xl px-5 py-5 border-2 border-zinc-600/30'>
                <div className='flex flex-row items-center justify-between'>
                    <h1 className='text-lg font-semibold'>Total amount</h1>
                    <DropdownMenu onOpenChange={(open) => setCurrencyDropDownOpen(open)}>
                        <DropdownMenuTrigger asChild>
                            <div className='flex flex-row items-center justify-center px-2 py-1 rounded-r-full rounded-l-full border-zinc-600/30 border-2 gap-2'>
                                {currency === "inr" ? (<IN title="United States" className='w-4 h-4' />) : currency === "usd" ? (<US title="United States" className='w-4 h-4' />) : (<EU title="United States" className='w-4 h-4' />)}
                                <h1 className='text-sm'>{currency.toUpperCase()}</h1>
                                <FaChevronDown className={`text-zinc-600/50 transition-all duration-300 w-3 h-3 ${isCurrencyDropDownOpen ? "rotate-180" : "rotate-0"}`} />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {CURRENCIES.map((Currency) => (
                                <DropdownMenuItem key={Currency.key} className={`flex items-center gap-1 text-base cursor-default hover:bg-zinc-100 p-1.5 w-full ${Currency.value === currency ? "bg-zinc-100" : ""}`}
                                    onClick={() => { setCurency(Currency.key) }}>
                                    <FaCheck className={`${Currency.value === currency ? "opacity-100" : "opacity-0"}`} />
                                    {Currency.key === "inr" ? (<IN title="United States" className='w-4 h-4' />) : Currency.key === "usd" ? (<US title="United States" className='w-4 h-4' />) : (<EU title="United States" className='w-4 h-4' />)}
                                    <h1 className='text-sm'>{Currency.value}</h1>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className='flex flex-col gap-2 mt-5'>
                    <div className='flex flex-row items-center justify-between'>
                        <h1>Base Price</h1>
                        <h1>{formatPrice(BASE_PRICE, currency)}</h1>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                        <h1>{caseMaterialLabel}</h1>
                        <h1>{formatPrice(caseMaterialPrice!, currency)}</h1>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                        <h1>{caseFinishLabel}</h1>
                        <h1>{formatPrice(caseFinishPrice!, currency)}</h1>
                    </div>
                </div>
                <div className="dashedHR my-3"></div>
                <div className='flex flex-row items-center justify-between'>
                    <h1>Total</h1>
                    <h1>{formatPrice((BASE_PRICE + caseMaterialPrice! + caseFinishPrice!), currency)}</h1>
                </div>
            </div>
            <div className='w-full flex items-center justify-center md:justify-between mt-4'>
                <div className='hidden md:flex flex-row items-center justify-center'>
                    <h1>Payment Powered By</h1>
                    <Image src="/stripe.png" alt='stripe' width={70} height={70} />
                </div>
                <div className='w-full md:w-[10rem] md:px-5 h-[2.7rem] rounded-lg text-white bg-[#6C48C5]
                hover:opacity-90 flex flex-row gap-2 items-center justify-center cursor-pointer' onClick={()=>{
                    createPaymentSession({configID:orderData.id})
                    setIsLoading(true)
                }}>
                    {isLoading ? <div className='flex items-center justify-center animate-spin'><CgSpinner className='text-white w-6 h-6' /></div> : <div className='flex flex-row gap-3 items-center justify-center'><h1>Check Out</h1>
                        <FaArrowRightLong /></div>}
                </div>
            </div>
        </div>
    )
}

export default PreviewPage