import { FaExclamationTriangle } from "react-icons/fa"
interface errorProps{
    message:string | undefined
}
export const ErrorMessage = ({message}:errorProps) => {
    return(
        <div className="text-sm text-red-500 flex flex-row gap-2 ml-3">
            <FaExclamationTriangle className="mt-[2px]"/>
            <h1>{message}</h1>
        </div>
    )
}