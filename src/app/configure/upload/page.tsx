/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Navbar from "@/components/navbar"
import Stepper from "@/components/stepper"
import { TailwindToast } from "@/components/tailwindToast"
import { Progress } from "@/components/ui/progress"
import { useUploadThing } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import Dropzone, { FileRejection } from "react-dropzone"
import { CgSpinner } from "react-icons/cg"
import { IoMdInformationCircleOutline } from "react-icons/io"
import { IoCloudUploadOutline } from "react-icons/io5"
import { SlSocialDropbox } from "react-icons/sl"
import ImagePreview from "./imagePreview"
import AnimatedWrapper from "@/components/animatedWrapper"

const uploadPage = () => {
    const [isDragOver, setIsDragOver] = useState<boolean>(false)

    const [isPending, setTransition] = useTransition()

    const [progressValue, setProgressValue] = useState(50)

    const [configid, setConfigid] = useState("")

    const [fileData, setFileData] = useState({
        imageUrl: "default",
        fileName: "default",
        fileType: "default",
        fileSize: 0
    });

    const router = useRouter()

    const [isUploaded, setIsUploaded] = useState(false)

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: ([data]) => {
            console.log("Upload complete data:", data);
            const configID = data.serverData.configID;
            const clientFileName = data.name
            const clientFileSize = data.size
            const clientFileType = data.type
            const clientImageUrl = data.url
            setIsUploaded(true)
            setConfigid(configID)
            setFileData((prevData) => ({
                ...prevData,
                fileName: clientFileName,
                fileSize: clientFileSize,
                fileType: clientFileType,
                imageUrl: clientImageUrl
            }))
        },
        onUploadProgress(p) {
            setProgressValue(p)
        },
    })

    const onDropRejected = (rejectedFile: FileRejection[]) => {
        const [file] = rejectedFile
        setIsDragOver(false)
        TailwindToast({ message: `${file.file.type} is not supported.`, context: "fail" })

    }
    const onDropAccepted = (acceptedFile: File[]) => {
        startUpload(acceptedFile, { configID: undefined })
        setIsDragOver(false)
    }

    return (
        <div className="w-full bg-white">
            <Navbar buttons="false"></Navbar>
            <div className="flex flex-col md:mx-[5rem] items-center justify-center">
                <div className="mt-2">
                    <Stepper one="true" two={"false"} three={"false"}></Stepper>
                </div>
                <div className="flex flex-col md:mt-5 mt-[3rem] items-center justify-center">
                    <h1 className="text-xl md:text-2xl tracking-tight font-medium">Upload your <span className="text-white bg-[#6C48C5] px-2 py-1 rounded-md">custom</span> Image.</h1>
                    <div className="w-full h-full mt-7">
                        <Dropzone
                            onDragEnter={() => setIsDragOver(true)}
                            onDragLeave={() => setIsDragOver(false)}
                            onDropRejected={onDropRejected}
                            onDropAccepted={onDropAccepted}
                            accept={{
                                "image/png": [".png"],
                                "image/jpeg": [".jpeg"],
                                "image/jpg": [".jpg"],
                            }}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()} className={`bg-zinc-600/5 w-full flex flex-col items-center justify-center rounded-2xl md:px-[10rem] py-[2rem] border-2 border-dashed border-[#6C48C5] px-5 ${isDragOver ? "md:bg-zinc-600/25" : null} transition-all duration-500`}>
                                        <input {...getInputProps()} />
                                        {isDragOver ? (<div className="flex flex-col items-center justify-center w-full">
                                            <SlSocialDropbox className="w-8 h-8 text-[#6C48C5]"></SlSocialDropbox>
                                            <div className="flex flex-col gap-1 items-center justify-center">
                                                <p className="mt-4 text-zinc-600"><span className="font-semibold text-zinc-600">Drop file</span> to upload.</p>
                                                <p className="text-zinc-600 text-sm">Maximum file size : 10MB</p>
                                                <p className="text-zinc-600 text-sm">PNG,JPG,JPEG</p>
                                            </div>
                                        </div>) : isUploading ? (<div className="flex flex-col items-center justify-center w-full">
                                            <CgSpinner className="w-8 h-8 animate-spin text-[#6c49c5]"></CgSpinner>
                                            <div className="flex flex-col gap-1 items-center justify-center">
                                                <p className="mt-4 text-zinc-600"><span className="font-semibold text-zinc-600">Uploading...</span></p>
                                                <Progress value={progressValue} className="my-2" />
                                                <p className="text-zinc-600 text-sm">Maximum file size : 10MB</p>
                                                <p className="text-zinc-600 text-sm">PNG,JPG,JPEG</p>
                                            </div>
                                        </div>) : isPending ? (<div className="flex flex-col items-center justify-center w-full">
                                            <CgSpinner className="w-8 h-8 animate-spin text-[#6C48C5]"></CgSpinner>
                                            <div className="flex flex-col gap-1 items-center justify-center">
                                                <p className="mt-4 text-zinc-600"><span className="font-semibold text-zinc-600">Redirecting, please wait...</span></p>
                                                <p className="text-zinc-600 text-sm">PNG,JPG,JPEG</p>
                                            </div>
                                        </div>) : (<div className="flex flex-col items-center justify-center w-full">
                                            <IoCloudUploadOutline className="w-8 h-8 text-[#6C48C5]"></IoCloudUploadOutline>
                                            <div className="flex flex-col gap-1 items-center justify-center">
                                                <p className="mt-4 text-zinc-600"><span className="font-semibold text-zinc-600">Click to Upload</span> or Drag and Drag</p>
                                                <p className="text-zinc-600 text-sm">Maximum file size : 10MB</p>
                                                <p className="text-zinc-600 text-sm">PNG,JPG,JPEG</p>
                                            </div>
                                        </div>)}
                                    </div>
                                </section>
                            )}
                        </Dropzone>

                    </div>
                    <div className="flex flex-row gap-1 items-center justify-center md:bg-[#6C48C5]/30 md:px-9 px-7 py-2 rounded-l-full rounded-r-full mt-5 bg-[#6C48C5]/20">
                        <IoMdInformationCircleOutline className="w-5 h-5 md:w-5 md:h-5 md:mt-[1px] -mt-[2px] text-[#6C48C5]" />
                        <h1 className="text-sm hidden md:block text-[#6C48C5] font-semibold">Use an image close to your device&apos;s resolution for better experience.</h1>
                        <h1 className="text-sm md:hidden text-[#6C48C5] font-semibold">Match your device&apos;s screen size</h1>
                    </div>
                    {isUploaded && (<div className="w-full">
                        <AnimatedWrapper transition={{ duration: 0.8, ease: "easeInOut" }}>
                            <div className="w-full">
                                <ImagePreview imageUrl={fileData.imageUrl} fileName={fileData.fileName} fileSize={fileData.fileSize} fileType={fileData.fileType}></ImagePreview>
                            </div>
                            <div className="w-full">
                                <button className="w-full flex items-center justify-center rounded-l-full rounded-r-full bg-[#6C48C5] text-white hover:bg-[#6C48C5]/90 py-4 md:py-3 mt-5 transition-all duration-500 md:mb-10" onClick={() => {
                                    router.push(`/configure/design?id=${configid}`)
                                }}>
                                    Continue
                                </button>
                            </div>
                        </AnimatedWrapper>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default uploadPage