/* eslint-disable @next/next/no-img-element */
import { Progress } from "@/components/ui/progress";
import { IoImageOutline } from "react-icons/io5"
import { IoIosCheckmarkCircle } from "react-icons/io";
interface ImagePreviewProps {
    imageUrl: string,
    fileName: string,
    fileType:string,
    fileSize: number,
}
const ImagePreview = ({ imageUrl, fileName, fileSize,fileType }: ImagePreviewProps) => {
    const fileSizeInKB = (fileSize / 1024).toFixed(2);
    const fileSizeInMB = (fileSize / 1048576).toFixed(2);
    let displaySize;
    if (fileSize > 524288) {
        displaySize = `${fileSizeInMB} MB`;
    } else {
        displaySize = `${fileSizeInKB} KB`;
    }
    return (
        <div className="w-full md:bg-[#6C48C5]/20 bg-[#6C48C5]/15 backdrop-blur-lg mt-5 rounded-xl h-[6rem] flex flex-row items-center px-3 gap-2 md:gap-5">
            <div className="w-[5.5rem] h-[80%] flex items-center justify-center bg-zinc-600/10 rounded-xl hover:opacity-80 transition-all duration-500">
                {imageUrl == "default" ? <IoImageOutline /> : <img src={imageUrl} alt="image" className="rounded-xl h-[100%] w-[100%]"></img>}
            </div>
            <div className="w-full flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-2">
                        <h1 className="text-sm text-balance">{fileName.replace(/\.(jpg|jpeg|png)$/i, "")}</h1>
                        <div className="flex items-center justify-center md:bg-green-300 bg-green-200 px-2 rounded-l-full rounded-r-full">
                            <h1 className="text-xs text-green-700 font-semibold">{fileType.replace("image/","").toUpperCase()}</h1>
                        </div>
                    </div>
                    <IoIosCheckmarkCircle className="text-[#6C48C5] w-6 h-6"/>
                </div>
                <Progress value={100}></Progress>
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-xs">{displaySize}</h1>
                    <h1 className="text-xs">100%</h1>
                </div>
            </div>
        </div>
    )
}

export default ImagePreview