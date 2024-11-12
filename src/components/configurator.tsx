/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useRef, useState } from 'react'
import { AspectRatio } from './ui/aspect-ratio'
import NextImage from 'next/image'
import { Rnd } from "react-rnd"
import ResizeButton from './resizeButton'
import { ScrollArea } from './ui/scroll-area'
import { BASE_PRICE, COLORS, CURRENCIES, FINISHES, MATERIALS, MODELS } from './optionsData'
import { RadioGroup } from '@headlessui/react'
import { cn, formatPrice } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { FaChevronDown } from "react-icons/fa"
import { FaCheck } from "react-icons/fa6"
import { IN } from 'country-flag-icons/react/3x2'
import { US } from 'country-flag-icons/react/3x2'
import { EU } from 'country-flag-icons/react/3x2'
import { FaArrowRightLong } from "react-icons/fa6"
import { useUploadThing } from '@/lib/uploadthing'
import { TailwindToast } from './tailwindToast'
import { useMutation } from '@tanstack/react-query'
import { saveCaseConfig, saveCaseConfigArgs } from '@/app/configure/design/serverAction'
interface ImageProps {
    configID:string
    url: string
    height: number
    width: number
}
const ImageConfigurator = ({configID, url, height, width }: ImageProps) => {
    const [options, setOptions] = useState({
        color: COLORS[0], model: MODELS[0], material: MATERIALS[0],
        finish: FINISHES[0],currencies:CURRENCIES[0]
    })
    const [isDDOpen, setDDOpen] = useState(false)
    const [isCurrencyDropDownOpen,setCurrencyDropDownOpen] = useState(false)
    const [renderedDimension,setRenderedDimension] = useState({
        height:height/4,
        width:width/4
    })
    const [renderedPosition,setRenderedPosition] = useState({
        x:105,
        y:205
    })
    const phoneCaseRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const {startUpload} = useUploadThing('imageUploader')
    const {mutate:saveConfig} = useMutation({
        mutationKey:["save-config"],
        mutationFn:async (args:saveCaseConfigArgs) => {
            await Promise.all([uploadCroppedImage(),saveCaseConfig(args)])
        }
    })
    async function uploadCroppedImage(){
        try {
            const {left:caseLeft,top:caseTop,width,height} = phoneCaseRef.current!.getBoundingClientRect()
            const {left:containerLeft,top:containerTop} = containerRef.current!.getBoundingClientRect()
            const leftOffset = caseLeft - containerLeft
            const topOffset = caseTop - containerTop
            const actualX = renderedPosition.x-leftOffset
            const actualY = renderedPosition.y-topOffset

            const canvas = document.createElement("canvas")
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext("2d")

            const userImage = new Image()
            userImage.crossOrigin = "anonymous"
            userImage.src = url
            userImage.alt = "Description"
            await new Promise((resolve) => (userImage.onload = resolve))
            
            ctx?.drawImage(userImage,actualX,actualY,renderedDimension.width,renderedDimension.height)
            const base64 = canvas.toDataURL()
            const base64Data = base64.split(',')[1]
            const blob = base64ToBlob(base64Data, 'image/png')
            const file = new File([blob],"croppedCanvas.png",{type:"image/png"})
            await startUpload([file],{configID})
        } catch (error) {
            TailwindToast({message:"Something went wrong",context:"fail"})
        }
        function base64ToBlob(base64: string, mimeType: string) {
            const byteCharacters = atob(base64)
            const byteNumbers = new Array(byteCharacters.length)
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i)
            }
            const byteArray = new Uint8Array(byteNumbers)
            return new Blob([byteArray], { type: mimeType })
        }
    }
    return (
        <div className="relative grid grid-row-2 md:grid-cols-2 w-full mt-10 gap-10 md:gap-5">
            <div className="relative max-w-4xl overflow-hidden rounded-3xl border-dashed border-2 border-[#6C48C5] text-center flex items-center justify-center w-full px-12 py-14 md:h-[37.5rem]" ref={containerRef}>
                <div className='relative aspect-[896/1831] w-60 pointer-events-none bg-opacity-50 select-none'>
                    <AspectRatio
                        ratio={896 / 1831}
                        ref={phoneCaseRef}
                        className='w-full aspect-[896/1831] relative z-50 pointer-events-none'
                    >
                        <NextImage alt="phone Skeleton" fill src="/phone-template-white-edges.png" className='z-50 rounded-[32px] md:rounded-[38px]' />
                    </AspectRatio>
                    <div className='absolute z-40 inset-0 left-[1px] right-[1px] top-px bottom-px rounded-[32px] md:rounded-[40px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
                    <div className={`absolute left-[3px] right-[3px] top-px bottom-px bg-${options.color.tw} rounded-[25px] md:rounded-[32px] transition-all duration-500`} />
                </div>
                <Rnd default={{
                    x: 105,
                    y: 205,
                    height: height / 4,
                    width: width / 4
                }}
                    lockAspectRatio
                    onResizeStop={(_,__,ref,___,{x,y})=>{
                        setRenderedDimension({
                            height:parseInt(ref.style.height.slice(0,-2)),
                            width:parseInt(ref.style.width.slice(0,-2))
                        })
                        setRenderedPosition({x,y})
                    }}
                    onDragStop={(_,data)=>{
                        const {x,y} = data
                        setRenderedPosition({x,y})
                    }}
                    resizeHandleComponent={{
                        topRight: <ResizeButton />,
                        topLeft: <ResizeButton />,
                        bottomRight: <ResizeButton />,
                        bottomLeft: <ResizeButton />
                    }}
                    className='absolute border-2 border-green-300 z-20'
                >
                    <div className='relative z-60 pointer-events-none'>
                        <img src={url} alt="User Image" className={`w-[${width}px] h-[${height}px]`} />
                    </div>
                </Rnd>
            </div>
            <div className="flex flex-col w-full bg-white shadow-xl border-2 border-zinc-600/50 rounded-3xl h-[37.5rem]">
                <ScrollArea className='relative flex-1 overflow-auto rounded-3xl'>
                    <div className='absolute z-10 inset-x-0 bottom-12 bg-gradient-to-t from-white pointer-events-none' />
                    <div className='px-5 pt-7 pb-5'>
                        <h1 className='text-xl font-medium'>Customize your Case</h1>
                        <div className='w-full h-px bg-zinc-600/50 mt-2' />
                        <div className='flex flex-col gap-2 mt-4'>
                            <RadioGroup
                                value={options.color}
                                onChange={(val) => {
                                    setOptions((prev) => ({
                                        ...prev,
                                        color: val,
                                    }))
                                }}>
                                <h1>Color: {options.color.value}</h1>
                                <div className='mt-3 flex items-center space-x-1'>
                                    {COLORS.map((color) => (
                                        <RadioGroup.Option
                                            key={color.value}
                                            value={color}
                                            className={({ active, checked }) =>
                                                cn(
                                                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent',
                                                    {
                                                        [`border-${color.tw}`]: active || checked,
                                                    }
                                                )
                                            }>
                                            <span
                                                className={cn(
                                                    `bg-${color.tw}`,
                                                    'h-5 w-5 rounded-full border border-black border-opacity-10'
                                                )}
                                            />
                                        </RadioGroup.Option>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>
                        <div className='flex flex-col w-full mt-4 gap-2'>
                            <h1>Model</h1>
                            <DropdownMenu onOpenChange={(open) => setDDOpen(open)}>
                                <DropdownMenuTrigger asChild>
                                    <div className='flex justify-between items-center flex-row px-3 py-2 border-2 border-zinc-600/50 rounded-lg' onClick={() => {
                                        setDDOpen(!isDDOpen)
                                    }}>
                                        <h1>{options.model.label}</h1>
                                        <FaChevronDown className={`text-zinc-600/50 transition-all duration-300 ${isDDOpen ? "rotate-180" : "rotate-0"}`} />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='w-full'>
                                    {MODELS.map((model) => (
                                        <DropdownMenuItem key={model.value} className={`flex items-center gap-1 text-base cursor-default hover:bg-zinc-100 p-1.5 w-full ${model.value === options.model.value ? "bg-zinc-100" : ""}`} onClick={() => { setOptions((prev) => ({ ...prev, model })) }}>
                                            <FaCheck className={`${model.value === options.model.value ? "opacity-100" : "opacity-0"}`} />
                                            {model.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className='flex flex-row justify-between mt-4'>
                            <h1>
                                Material
                            </h1>
                            <div>
                                <DropdownMenu onOpenChange={(open)=>setCurrencyDropDownOpen(open)}>
                                    <DropdownMenuTrigger asChild>
                                        <div className='flex flex-row items-center justify-center px-2 py-1 rounded-r-full rounded-l-full border-zinc-600/50 border-2 gap-2 w-full'>
                                            {options.currencies.key === "inr"?(<IN title="United States" className='w-4 h-4'/>):options.currencies.key === "usd"?(<US title="United States" className='w-4 h-4'/>):(<EU title="United States" className='w-4 h-4'/>)}
                                            <h1 className='text-sm'>{options.currencies.value}</h1>
                                            <FaChevronDown className={`text-zinc-600/50 transition-all duration-300 w-3 h-3 ${isCurrencyDropDownOpen?"rotate-180":"rotate-0"}`}/>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {CURRENCIES.map((currency)=>(
                                            <DropdownMenuItem key={currency.key} className={`flex items-center gap-1 text-base cursor-default hover:bg-zinc-100 p-1.5 w-full ${currency.value === options.currencies.value ? "bg-zinc-100" : ""}`}
                                            onClick={() => { setOptions((prev) => ({ ...prev, currencies:currency })) }}>
                                                <FaCheck className={`${currency.value === options.currencies.value ? "opacity-100" : "opacity-0"}`} />
                                                {currency.key === "inr"?(<IN title="United States" className='w-4 h-4'/>):currency.key === "usd"?(<US title="United States" className='w-4 h-4'/>):(<EU title="United States" className='w-4 h-4'/>)}
                                                <h1 className='text-sm'>{currency.value}</h1>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <RadioGroup
                            value={options.material}
                            onChange={(val) => {
                                setOptions((prev) => ({
                                    ...prev,
                                    material: val,
                                }))
                            }}>
                            <div className='mt-3 space-y-4'>
                                {MATERIALS.map((materials) => (
                                    <RadioGroup.Option
                                        key={materials.value}
                                        value={materials}
                                        className={({ active, checked }) =>
                                            cn(
                                                'relative block cursor-pointer rounded-lg bg-white px-3 py-3 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between transition-all duration-500',
                                                {
                                                    ['border-[#6C48C5]']: active || checked,
                                                },
                                            )
                                        }>
                                        <div className='flex flex-row justify-between w-full transition-all duration-500 ease-in-out'>
                                            <div className='flex flex-col'>
                                                <h1>{materials.label}</h1>
                                                <h1 className='text-sm text-gray-900/50'>{materials.description}</h1>
                                            </div>
                                            <div className='flex text-sm items-center justify-center'>
                                                <h1>{formatPrice(materials.price,options.currencies.key)}</h1>
                                            </div>
                                        </div>
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                        <h1 className='mt-4'>
                            Finish
                        </h1>
                        <RadioGroup
                            value={options.finish}
                            onChange={(val) => {
                                setOptions((prev) => ({
                                    ...prev,
                                    finish: val,
                                }))
                            }}>
                            <div className='mt-3 space-y-4'>
                                {FINISHES.map((finishes) => (
                                    <RadioGroup.Option
                                        key={finishes.value}
                                        value={finishes}
                                        className={({ active, checked }) =>
                                            cn(
                                                'relative block cursor-pointer rounded-lg bg-white px-3 py-3 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between transition-all duration-500',
                                                {
                                                    ['border-[#6C48C5]']: active || checked,
                                                },
                                            )
                                        }>
                                        <div className='flex flex-row justify-between w-full transition-all duration-500 ease-in-out'>
                                            <div className='flex flex-col'>
                                                <h1>{finishes.label}</h1>
                                                <h1 className='text-sm text-gray-900/50'>{finishes.description}</h1>
                                            </div>
                                            <div className='flex text-sm items-center justify-center'>
                                                <h1>{formatPrice(finishes.price,options.currencies.key)}</h1>
                                            </div>
                                        </div>
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>
                </ScrollArea>
                <div className='w-full flex flex-col mb-5 px-5 gap-5'>
                    <div className='w-full h-px bg-zinc-600/50'/>
                    <div className='flex flex-row items-center justify-between w-full gap-4'>
                        <h1>{formatPrice((BASE_PRICE+options.material.price+options.finish.price),options.currencies.key)}</h1>
                        <div className='flex flex-row bg-[#6C48C5] hover:opacity-90 w-full md:py-1 py-2 items-center justify-center gap-2 rounded-lg text-white' onClick={()=>{saveConfig({color:options.color.value,material:options.material.value,finish:options.finish.value,model:options.model.value})}}>
                                <h1>Continue</h1>
                                <FaArrowRightLong/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageConfigurator