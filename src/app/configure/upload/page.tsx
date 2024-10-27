/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Stepper from "@/components/stepper"
import Dropzone from "react-dropzone"
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react"
const uploadPage = () => {
    const[twoActive,setTwoActive] = useState("false")
    const[threeActive,setThreeActive] = useState("false")
    const[count,setCount] = useState(1)
    const handleChange = (newCount:number) => {
        setCount(newCount)
        if(newCount == 2){
            setTwoActive("true")
            setThreeActive("false")
        }
        if(newCount == 3){
            setThreeActive("true")
        }
        if(newCount == 1){
            setTwoActive("false")
        }
    }
    return (
        <div className="w-full min-h-[calc(100vh-4rem)] bg-white">
            <Navbar buttons="false"></Navbar>
            <div className="flex flex-col md:mx-[5rem] items-center justify-center">
                <div className="mt-2">
                    <Stepper one="true" two={twoActive} three={threeActive}></Stepper>
                </div>
                <div className="flex flex-col md:mt-5 mt-[3rem] items-center justify-center">
                    <h1 className="text-xl md:text-2xl tracking-tight font-medium">Upload your <span className="text-white bg-[#6C48C5] px-2 py-1 rounded-md">custom</span> Image.</h1>
                    <div className="w-full h-full mt-7">
                        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()} className="bg-zinc-600/5 w-full flex flex-col items-center justify-center rounded-2xl md:px-[10rem] py-[2rem] border-2 border-dashed border-[#6C48C5] px-5">
                                        <input {...getInputProps()} />
                                        <div className="flex flex-col items-center justify-center w-full">
                                            <IoCloudUploadOutline className="w-8 h-8"></IoCloudUploadOutline>
                                            <div className="flex flex-col gap-1 items-center justify-center">
                                                <p className="mt-4 text-zinc-600"><span className="font-semibold text-zinc-600">Click to upload</span> or drag and drop</p>
                                                <p className="text-zinc-600 text-sm">Maximum file size : 10MB</p>
                                                <p className="text-zinc-600 text-sm">PNG,JPG,JPEG</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </Dropzone>

                    </div>
                    <div className="flex flex-row gap-1 items-center justify-center md:bg-[#6C48C5]/50 md:px-9 px-7 py-2 rounded-l-full rounded-r-full mt-5 bg-[#6C48C5]/30">
                        <IoMdInformationCircleOutline className="w-5 h-5 md:w-5 md:h-5 md:mt-[1px] -mt-[2px]" />
                        <h1 className="text-sm hidden md:block">Use an image close to your device&apos;s resolution for better resolution.</h1>
                        <h1 className="text-sm md:hidden">Match your device&apos;s screen size</h1>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-end gap-2 mt-7">
                    <button className="flex flex-row items-center justify-center bg-[#6C48C5] px-2 pr-4 py-2 rounded-lg text-white gap-1" disabled={count === 1} onClick={()=>handleChange(Math.max(count-1,1))}>
                        <IoIosArrowBack />
                        <h1>Back</h1>
                    </button>
                    <button className="flex flex-row items-center justify-center bg-[#6C48C5] px-2 pl-4 py-2 rounded-lg text-white gap-1" disabled={count === 3} onClick={()=>handleChange(Math.min(count+1,3))}>
                        <h1>Next</h1>
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default uploadPage