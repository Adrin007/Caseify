/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useEffect, useRef } from "react";
import { RegisterForm } from "@/components/auth/registerForm";
import { Backlink } from "@/components/backlink";

export default function login() {
  const movableRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleMouseMove = (event: { clientX: any; clientY: any; }) => {
      const { clientX, clientY } = event;
      movableRef.current?.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
      }, { duration: 3000, fill: "forwards" });
    };
    document.body.addEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <div className='relative min-h-screen bg-white font-josefin cursor-default w-screen overflow-hidden items-center justify-center' id='body'>
      {/* <div ref={movableRef} className={`absolute z-0 left-[50%] w-[200px] h-[200px] rounded-full blob hidden md:block`}></div> */}
      <div className='min-h-screen backdrop-filter backdrop-blur-[90px] flex-col md:flex items-center justify-center'>
        <div className="mx-7">
          <div className='pt-5 md:pt-[1rem]'>
            <h1 className='font-bold text-xl md:text-xl md:ml-10 md:mb-5 cursor-pointer'>CASEi<span className='text-[#6C48C5]'>FY</span></h1>
          </div>
          <div className='grid md:grid-cols-2 mb-4'>
            <div className="hidden md:flex flex-col items-center justify-center">
              <div className="flex flex-col mx-10">
                <h1 className="text-5xl text-balance !leading-tight font-bold tracking-tight">
                  Sign In To <span className="bg-[#6C48C5] text-white px-2 pb-1 rounded-xl">Manage</span> Awesome Stuff.
                </h1>
                <h1 className="text-md font-semibold tracking-tight mt-7 w-[60%]">
                  If you already have an account <span><Backlink text="Login here!" href="/auth/login"></Backlink></span>
                </h1>
              </div>
            </div>
            <div className="mt-[3rem] md:mt-0 md:mx-20">
              <h1 className="md:text-5xl text-3xl font-bold text-black text-balance tracking-tight text-center md:hidden !leading-tight">Sign In to <span className="bg-[#6C48C5] text-white px-2 pb-1 rounded-xl">Manage</span> Awesome Stuff!</h1>
              <RegisterForm></RegisterForm>
            </div>
          </div>
        </div>
        <div className="md:hidden w-full items-center justify-center flex">
          <h1 className="text-sm font-lg tracking-tight mt-5">
            If you already have an account <span><Backlink text="Login here!" href="/auth/login"></Backlink></span>
          </h1>
        </div>
        <footer className="w-auto bg-white/25 mt-[5rem] md:mt-20 flex flex-col md:flex-row md:justify-between px-9 md:px-10 text-sm py-3 gap-2 border-t-2 border-gray-200 shadow-inner md:hidden">
          <h1 className="text-wrap">© 2024 CASEiFY, Inc. All rights reserved.</h1>
          <div className="flex flex-cols gap-8 md:gap-5 tracking-tight">
            <h1>Terms</h1>
            <h1>Privacy Policy</h1>
            <h1>Cookie Policy</h1>
          </div>
        </footer>
      </div>
    </div>
  )
}