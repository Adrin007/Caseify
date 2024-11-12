"use client"
import Navbar from "@/components/navbar"
import Stepper from "@/components/stepper"
import TanstackProvider from "@/components/tanstack"

interface layoutProps {
    children: React.ReactNode
}

const layout = ({ children }: layoutProps) => {
    return (
        <div className="w-full bg-white">
            <Navbar buttons="false"></Navbar>
            <div className="flex flex-col mb-20 items-center justify-center mx-[1rem] md:mx-[5rem]">
                <div className="mt-2">
                    <Stepper one="true" two="true" three={"false"}></Stepper>
                </div>
                <TanstackProvider>
                    {children}
                </TanstackProvider>
            </div>
        </div>
    )
}

export default layout