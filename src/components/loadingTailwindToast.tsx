import { LoaderIcon } from "react-hot-toast";

export const TailwindToastLoading = ({ message }: { message: string }) => {
    return (
        <div className="bg-white border-2 border-dashed border-black/60 text-balck px-4 py-2 rounded flex items-center space-x-3 rounded-l-full rounded-r-full" role="alert">
            <LoaderIcon className="animate-spin" />
            <span>{message}</span>
        </div>
    )
}