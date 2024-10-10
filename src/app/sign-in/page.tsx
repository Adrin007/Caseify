/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useEffect, useRef } from "react";
import Image from 'next/image'
import { useRouter } from "next/navigation";

export default function login() {
  const router = useRouter()
  const routerHandler = () =>{
    router.push('/login')
  }
  const routeToHome = () =>{
    router.push('/')
  }
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
      <div ref={movableRef} className={`absolute z-0 left-[50%] w-[200px] h-[200px] rounded-full blob hidden md:block`}></div>
      <div className='min-h-screen backdrop-filter backdrop-blur-[90px] flex-col md:flex items-center justify-center'>
        <div className="mx-7">
          <div className='pt-5 md:pt-[1rem]'>
            <h1 onClick={routeToHome} className='font-bold text-xl md:text-xl md:ml-10 md:mb-5 cursor-pointer'>CASEi<span className='text-[#6C48C5]'>FY</span></h1>
          </div>
          <div className='grid md:grid-cols-2 mb-4'>
            <div className="hidden md:flex flex-col items-center justify-center">
              <div className="flex flex-col mx-10">
                <h1 className="text-5xl text-balance !leading-tight font-bold tracking-tight">
                  Sign In To <span className="bg-[#6C48C5] text-white px-2 pb-1 rounded-xl">Manage</span> Awesome Stuff.
                </h1>
                <h1 className="text-md font-semibold tracking-tight mt-7 w-[60%]">
                  If you already have an account <span onClick={routerHandler} className="text-[#6C48C5] cursor-pointer">Login here!</span>
                </h1>
              </div>
            </div>
            <div className="mt-[3rem] md:mt-0 md:mx-20">
              <h1 className="md:text-5xl text-3xl font-bold text-black text-balance tracking-tight text-center md:hidden !leading-tight">Sign In to <span className="bg-[#6C48C5] text-white px-2 pb-1 rounded-xl">Manage</span> Awesome Stuff!</h1>
              <div className="w-full mt-8 md:mt-5 bg-[#E6E6FA] md:bg-white/40 md:backdrop-filter md:backdrop-blur-[90px] rounded-2xl px-1">
                <div className="flex flex-col items-center justify-center pt-10 gap-3 px-3">
                  <input type="email" name="emailId" id="" className="w-full py-3 px-4 rounded-2xl bg-[#fefefe] md:bg-[#F2F2F2] focus:outline-none shadow-inner" placeholder="Enter Email" />
                  <input type="password" name="emailId" id="" className="px-4 w-full py-3 rounded-2xl bg-[#fefefe] md:bg-[#F2F2F2] focus:outline-none shadow-inner" placeholder="Enter Password" />
                  <input type="password" name="emailId" id="" className="px-4 w-full py-3 rounded-2xl bg-[#fefefe] md:bg-[#F2F2F2] focus:outline-none shadow-inner" placeholder="Confirm Password" />
                  <div className="flex w-full items-end justify-end">
                    <h1 className="text-sm text-black/50">forgot password?</h1>
                  </div>
                  <div className="px-5 w-full">
                    <div className="h-px w-full bg-black/10 rounded-full md:hidden px-5"></div>
                  </div>
                  <div className="w-full bg-[#6C48C5] py-3 rounded-2xl text-center mt-3 md:mt-0 mb-2 hover:bg-[#6C48C5]/80 transition-all duration-500">
                    <h1 className="text-white">Sign-In</h1>
                  </div>
                  <div className="w-full bg-[#fefefe] py-3 rounded-2xl text-center flex flex-row items-center justify-center gap-3 shadow-inner md:bg-[#F2F2F2]">
                    <Image src="/google.png" width={25} height={25} alt="google" />
                    <h1 className="text-black">Continue with Google</h1>
                  </div>
                  <div className="flex flex-row gap-3 mb-10 md:mb-7 w-full">
                    <div className="w-full bg-[#fefefe] py-3 rounded-2xl text-center flex flex-row items-center justify-center gap-3 px-4 shadow-inner md:bg-[#F2F2F2]">
                      <Image src="/x.png" width={25} height={25} alt="google" />
                      <h1 className="text-black">Facebook</h1>
                    </div>
                    <div className="w-full bg-[#fefefe] py-3 rounded-2xl text-center flex flex-row items-center justify-center gap-3 px-4 shadow-inner md:bg-[#F2F2F2]">
                      <Image src="/github.png" width={25} height={25} alt="google" />
                      <h1 className="text-black">Github</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden w-full items-center justify-center flex">
          <h1 className="text-sm font-lg tracking-tight mt-5">
            If you already have an account <span onClick={routerHandler} className="text-[#6C48C5] cursor-pointer">Login here!</span>
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