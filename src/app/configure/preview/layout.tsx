"use client"
import Navbar from '@/components/navbar'
import Stepper from '@/components/stepper'
import TanstackProvider from '@/components/tanstack'
import React from 'react'
interface layoutProps{
    children : React.ReactNode
}
const previewLayout = ({ children }:layoutProps) => {
    return (
        <div className="w-full bg-white -mb-10">
            <Navbar buttons="false"></Navbar>
            <div className="flex flex-col mb-20 items-center justify-center mx-[1rem] md:mx-[5rem]">
                <div className="mt-2">
                    <Stepper one="true" two="true" three="true"></Stepper>
                </div>
                <TanstackProvider>
                    {children}
                </TanstackProvider>
            </div>
        </div>
    )
}

export default previewLayout