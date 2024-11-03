/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client"
import Navbar from "@/components/navbar";
import Stepper from "@/components/stepper";
interface PageProps {
    searchParams: {
        id?: string;
    };
}
const Design = ({ searchParams }: PageProps) => {
    const { id } = searchParams;
    return (
        <div className="w-full bg-white">
            <Navbar buttons="false"></Navbar>
            <div className="flex items-center justify-center md:mx-[5rem]">
                <div className="mt-2">
                    <Stepper one="true" two="true" three={"false"}></Stepper>
                </div>
            </div>
        </div>
    );
};

export default Design;
