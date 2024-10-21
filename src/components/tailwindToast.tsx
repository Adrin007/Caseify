import toast from "react-hot-toast"
import {CheckmarkIcon,ErrorIcon} from "react-hot-toast"

interface toastprops{
    message:string,
    context?:string
}
export const TailwindToast = ({message,context}:toastprops) => {
    toast.custom((t) => (
        <div className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md bg-white shadow-lg rounded-lg pointer-events-auto flex px-4 py-2 border-2 border-dashed ${context == "success"?'border-green-500':'border-red-500'} rounded-l-full rounded-r-full`}
        >  
            <div className="flex flex-row gap-3">
                {context == "success"?<CheckmarkIcon className="mt-[1px]"/>:<ErrorIcon className="mt-[1px]"/>}
                <h1>{message}</h1>
            </div>
            
        </div>
      ), {
        duration:2000,
      });
}