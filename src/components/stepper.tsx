interface StepperProps{
    one:string,
    two:string,
    three:string
}
const Stepper = ({one,two,three}:StepperProps) => {
    return (
        <ol className="flex items-center p-3 space-x-2 text-sm font-medium text-center text-gray-500 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
            <li className="flex items-center">
                <span className={`flex items-center justify-center md:w-6 md:h-6 w-5 h-5 me-2 text-xs border-2 rounded-full ${one == "true"?"border-[#6C48C5] bg-[#6C48C5] text-white":"border-gray-500"} transition-all duration-500`}>
                    1
                </span>
                <h1 className={`text-[15px] md:text-lg ${one == "true"?"text-[#6C48C5]":""} text-nowrap transition-all duration-500`}>Upload <span className="hidden md:inline">Image</span></h1>
                <svg className={`w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180 ${one == "true"?"":"arrow"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10 transition-all duration-500">
                    <path stroke={one == "true"?"#6C48C5":"currentColor"} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                </svg>
            </li>
            <li className="flex items-center">
                <span className={`flex items-center justify-center md:w-6 md:h-6 w-5 h-5 me-2 text-xs border-2 rounded-full ${two == "true"?"border-[#6C48C5] bg-[#6C48C5] text-white":"border-gray-500"} shrink-0 transition-all duration-500`}>
                    2
                </span>
                <h1 className={`text-[15px] md:text-lg ${two == "true"?"text-[#6C48C5]":""} md:hidden transition-all duration-500`}>Edit</h1>
                <h1 className={`text-[15px] md:text-lg ${two == "true"?"text-[#6C48C5]":""} hidden md:block transition-all duration-500`}>Customize</h1>
                <svg className={`w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180 ${two == "true"?"":"arrow"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10 transition-all duration-500">
                    <path stroke={two == "true"?"#6C48C5":"currentColor"} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                </svg>
            </li>
            <li className="flex items-center gap-2">
                <span className={`flex items-center justify-center md:w-6 md:h-6 w-5 h-5 text-xs border-2 rounded-full ${three == "true"?"border-[#6C48C5] bg-[#6C48C5] text-white":"border-gray-500"} transition-all duration-500`}>
                    3
                </span>
                <h1 className={`text-[15px] md:text-lg transition-all duration-500 ${three == "true"?"text-[#6C48C5]":""}`}> Summary</h1>
            </li>
        </ol>


    )
}

export default Stepper