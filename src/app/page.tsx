/* eslint-disable @next/next/no-img-element */
"use client"
import { StarFilledIcon } from "@radix-ui/react-icons";
import { ArrowRight, Check, ExternalLink, Fingerprint, ShieldCheck, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import PhoneSkel from "@/components/phoneSkel";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import AnimatedWrapper from "@/components/animatedWrapper";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

export default function Home() {
  const images = [
    "/testimonials/1.jpeg",
    "/testimonials/2.jpeg",
    "/testimonials/3.jpeg",
    "/testimonials/4.jpeg",
    "/testimonials/5.jpeg",
    "/testimonials/6.jpeg",
  ]
  const [currentImage, setCurrentImage] = useState(0)
  const router = useRouter()
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 7500);

    return () => clearInterval(interval);
  }, [images.length]);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 640);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen select-none">
      <Navbar buttons="true"></Navbar>
      <div className="items-center justify-center grid grid-row-2 md:grid-cols-2 mt-12 md:mt-8 md:ml-20 md:mr-10">
        <div className="flex flex-col text-center md:text-left">
          <AnimatedWrapper viewport={{ once: true, amount: 0 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0 }}>
            <h1 className="font-bold text-5xl md:text-7xl w-fit tracking-tight text-balance !leading-tight">Your Image on a <span className="bg-[#6C48C5] text-white px-2 pb-1 rounded-xl">Custom</span> Phone Case</h1>
          </AnimatedWrapper>
          <AnimatedWrapper viewport={{ once: true, amount: 0 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}>
            <p className="mt-6 mx-7 md:mx-0 text-md max-w-prose text-wrap tracking-tight">Capture your memories with a <span className="font-bold">one-of-a-kind</span> phone case. Caseify protects both your phone and your cherished moments.</p></AnimatedWrapper>
          <div className="flex items-center justify-center md:items-start md:justify-start">
            <ul className="flex flex-col mt-5 gap-2">
              <AnimatedWrapper viewport={{ once: true, amount: 0 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}>
                <li className="flex items-center items-left gap-1">
                  <Check className="size-[23px] text-[#6C48C5]"></Check>
                  <h1>High-quality, durable material</h1>
                </li>
              </AnimatedWrapper>
              <AnimatedWrapper viewport={{ once: true, amount: 0 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}>
                <li className="flex items-center justify-left gap-1">
                  <Check className="size-[23px] text-[#6C48C5]"></Check>
                  <h1>5 year print guarantee</h1>
                </li>
              </AnimatedWrapper>
              <AnimatedWrapper viewport={{ once: true, amount: 0 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}>
                <li className="flex items-center text-left gap-1">
                  <Check className="size-[23px] text-[#6C48C5]"></Check>
                  <h1>Modern models supported</h1>
                </li>
              </AnimatedWrapper>
            </ul>
          </div>
          <div className="mt-10 md:mt-5 flex flex-col md:flex-row md:gap-4">
            <AnimatedWrapper viewport={{ once: true, amount: 0 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.8 }}>
              <div className="flex flex-row -space-x-4 items-center justify-center">
                <Image src="/users/user-4.jpg" width={40} height={40} alt="Profile 1" className="rounded-full ring-2 ring-slate-100 object-cover" />
                <Image src="/users/user-2.png" width={40} height={40} alt="Profile 1" className="rounded-full ring-2 ring-slate-100" />
                <Image src="/users/user-3.png" width={40} height={40} alt="Profile 1" className="rounded-full ring-2 ring-slate-100" />
                <Image src="/users/user-1.png" width={40} height={40} alt="Profile 1" className="rounded-full ring-2 ring-slate-100" />
                <Image src="/users/aswin.jpg" width={40} height={40} alt="Profile 1" className="rounded-full ring-2 ring-slate-100" />
              </div>
            </AnimatedWrapper>
            <div className="flex flex-col mt-5 md:mt-1">
              <AnimatedWrapper viewport={{ once: true, amount: 0 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 1 }}>
                <div className="flex flex-row items-center justify-center md:items-start md:justify-start">
                  <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                  <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                  <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                  <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                  <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                </div>
              </AnimatedWrapper>
              <AnimatedWrapper viewport={{ once: true, amount: 0 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 1.2 }}>
                <div className="mt-1 md:mt-0">
                  <h1>1980+ Happy customers.</h1>
                </div>
              </AnimatedWrapper>
            </div>
          </div>
        </div>
        <div className="mt-0 relative flex items-center justify-center md:pl-[6rem] md:mb-10">
          <Image src={"/your-image.png"} alt="Line-decor" height={130} width={130} className="absolute -right-4 top-0 hidden md:block " />
          <PhoneSkel ImgSRC={images[currentImage]} dark={false}></PhoneSkel>
          <Image src={"/line.png"} alt="Line-decor" height={80} width={80} className="absolute -bottom-7 md:left-[8.5rem] left-7" />
        </div>
      </div>
      <div className="md:mx-20 mt-20 flex flex-col items-center justify-center">
        <h1 className="md:text-5xl text-4xl font-bold text-black text-balance tracking-tight text-center md:text-left md:text-wrap !leading-tight">Reviews from our <span className="text-white bg-[#6C48C5] px-2 rounded-lg pt-[3px]">Customers!</span></h1>
        <div className="grid md:grid-cols-2 grid-rows-2 md:mt-20 mx-8 md:mx-0 mt-[4rem] gap-[2rem] md:gap-10">
          <AnimatedWrapper transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}>
            <div key={"Review1"}>
              <div className="flex flex-row items-start justify-start">
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
              </div>
              <div className="mt-5">
                <h1 className="tracking-tight text-balance text-lg">
                  &quot;The case feels durable and I even got a compliment on the design. Had the case for two months now, <span className="text-white bg-[#6C48C5] px-2 py-1 rounded-md">the image is clear</span>, on the case I had before, the image started fading into yellow-ish color after a couple weeks. Love it.&quot;
                </h1>
              </div>
              <div className="flex flex-row gap-5 mt-5">
                <Image src={"/users/aswin.jpg"} width={40} height={40} alt="User1" className="rounded-full" />
                <div className="flex flex-col">
                  <h1 className="font-bold">Aswin</h1>
                  <div className="flex flex-row gap-1">
                    <Check className="size-[20px] text-[#6C48C5]"></Check>
                    <h1 className="text-sm">Verified Purchase</h1>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-zinc-400 rounded-full md:hidden mt-[2rem]"></div>
            </div>
          </AnimatedWrapper>
          <AnimatedWrapper transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}>
            <div key={"Review2"}>
              <div className="flex flex-row items-start justify-start">
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
              </div>
              <div className="mt-5">
                <h1 className="tracking-tight text-balance text-lg">
                  &quot;I usually keep my phone together with my keys in my pocket and that led to some pretty heavy scratchmarks on all of my last phone cases. This one, besides a barely noticeable scratch on the corner, looks <span className="text-white bg-[#6C48C5] px-2 py-1 rounded-md">brand new after a year</span>. I dig it.&quot;
                </h1>
              </div>
              <div className="flex flex-row gap-5 mt-5">
                <Image src={"/users/user-1.png"} width={40} height={40} alt="User1" className="rounded-full" />
                <div className="flex flex-col">
                  <h1 className="font-bold">Akash</h1>
                  <div className="flex flex-row gap-1">
                    <Check className="size-[20px] text-[#6C48C5]"></Check>
                    <h1 className="text-sm">Verified Purchase</h1>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedWrapper>
          <AnimatedWrapper transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}>
            <div key={"Review3"} className="hidden md:block mt-2">
              <div className="flex flex-row items-start justify-start">
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
              </div>
              <div className="mt-5">
                <h1 className="tracking-tight text-balance text-lg">
                  &quot;The case fits perfectly, and the material feels great. <span className="text-white bg-[#6C48C5] px-2 py-1 rounded-md">After two months</span>, the colors have not faded. My old case lost its vibrancy quickly, but this one still looks new. I have also received compliments on the design!&quot;
                </h1>
              </div>
              <div className="flex flex-row gap-5 mt-5">
                <Image src={"/users/user-2.png"} width={40} height={40} alt="User1" className="rounded-full" />
                <div className="flex flex-col">
                  <h1 className="font-bold">Alexandra</h1>
                  <div className="flex flex-row gap-1">
                    <Check className="size-[20px] text-[#6C48C5]"></Check>
                    <h1 className="text-sm">Verified Purchase</h1>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-zinc-400 rounded-full md:hidden mt-[2rem]"></div>
            </div>
          </AnimatedWrapper>
          <AnimatedWrapper transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}>
            <div key={"Review4"} className="hidden md:block mt-2">
              <div className="flex flex-row items-start justify-start">
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
                <StarFilledIcon className="text-[#6C48C5] size-[23px]"></StarFilledIcon>
              </div>
              <div className="mt-5">
                <h1 className="tracking-tight text-balance text-lg">
                  &quot;I have <span className="text-white bg-[#6C48C5] px-2 py-1 rounded-md">dropped my phone a few times</span>, and the case kept it safe. After three months, the image is still sharp. My last case wore out fast, but this one is holding up well. Really happy with it, this one still looks new!&quot;
                </h1>
              </div>
              <div className="flex flex-row gap-5 mt-5">
                <Image src={"/users/user-4.jpg"} width={40} height={40} alt="User1" className="rounded-full" />
                <div className="flex flex-col">
                  <h1 className="font-bold">Christopher Cameron</h1>
                  <div className="flex flex-row gap-1">
                    <Check className="size-[20px] text-[#6C48C5]"></Check>
                    <h1 className="text-sm">Verified Purchase</h1>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-zinc-400 rounded-full md:hidden mt-[2rem]"></div>
            </div>
          </AnimatedWrapper>
        </div>
      </div>
      <div className="md:mt-20">
        <h1 className="md:text-5xl text-4xl font-bold text-black text-balance tracking-tight text-center md:text-wrap !leading-tight">Features That Set Us <span className="text-white bg-[#6C48C5] px-2 rounded-lg pt-[3px]">Apart</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center mt-[3rem] mx-7 gap-6 md:mx-20">
          <AnimatedWrapper viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}>
            <div id="box" className="bg-gradient-to-tr from-[#952aff]/40 to-[#952aff]/10 md:from-white/25 md:to-white/25 md:bg-white/25 rounded-xl md:border-l-2 md:rounded-3xl md:border-gray-300 shadow-lg flex flex-row gap-2 px-4 py-5 items-start justify-start md:items-start md:justify-start relative md:flex-col overflow-hidden">
              <div id="circle" className="w-[8rem] h-[8rem] rounded-full bg-[#952aff] overflow-hidden absolute -right-[4rem] -top-[4rem] hidden md:block"></div>
              <div className="flex-row gap-3 z-10 hidden md:flex">
                <ShieldCheck className="text-[#6C48C5] md:text-[#952aff] md:size-[30px] logo"></ShieldCheck>
                <h1 className="md:text-xl md:mt-[2px] md:text-[#952aff] tracking-tight heading">High-quality R2SiO material</h1>
              </div>
              <div className="flex-col gap-3 z-10 flex md:hidden w-full">
                <div className="flex flex-row items-center justify-between">
                  <div className="bg-white/35 backdrop-blur-lg rounded-full p-2">
                    <ShieldCheck className="text-[#952aff] md:size-[30px] logo"></ShieldCheck>
                  </div>
                    <h1 className="md:text-xl md:mt-[2px] md:text-[#952aff] tracking-tight heading">High-quality R2SiO material</h1>
                </div>
                <div className="w-full h-px bg-[#952aff]/40" />
                <div>
                  <p className="text-sm">
                    Crafted from premium R2SiO silicone, our cases offer a perfect balance of durability and softness.
                  </p>
                </div>
              </div>
              <p className="text-md hidden md:block mt-3 z-10 para">Crafted from premium R2SiO silicone, our cases offer a perfect balance of durability and softness. Resistant to scratches, drops, and yellowing.</p>
              <div className="flex flex-row gap-2 hidden md:flex mt-2 z-10">
                <h1 className="text-[#6C48C5] md:text-[#952aff] link">See details</h1>
                <ExternalLink className="text-[#6C48C5] md:text-[#952aff] size-[18px] mt-[2px] logo"></ExternalLink>
              </div>
            </div>
          </AnimatedWrapper>
          <AnimatedWrapper viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}>
            <div id="box" className="bg-gradient-to-br from-[#3ecd5e]/40 to-[#3ecd5e]/10 md:from-white/25 md:to-white/25 md:bg-white/25 rounded-xl md:border-l-2 md:rounded-3xl md:border-gray-300 shadow-lg flex flex-row gap-2 px-4 py-5 items-start justify-start md:items-start md:justify-start relative md:flex-col overflow-hidden">
              <div id="circle" className="w-[8rem] h-[8rem] rounded-full bg-[#3ecd5e] overflow-hidden absolute -right-[4rem] -top-[4rem] hidden md:block"></div>
              <div className="flex-row gap-3 z-10 hidden md:flex">
                <Fingerprint className="text-[#6C48C5] md:text-[#3ecd5e] md:size-[30px] logo"></Fingerprint>
                <h1 className="md:text-xl md:mt-[2px] md:text-[#3ecd5e] tracking-tight heading">Fingerprint resistant coating</h1>
              </div>
              <div className="flex-col gap-3 z-10 flex md:hidden w-full">
                <div className="flex flex-row items-center justify-between">
                  <div className="bg-white/35 backdrop-blur-lg rounded-full p-2">
                    <Fingerprint className="text-[#3ecd5e] md:size-[30px] logo"></Fingerprint>
                  </div>
                  <h1 className="md:text-xl md:mt-[2px] md:text-[#3ecd5e] tracking-tight heading">Fingerprint resistant coating</h1>
                </div>
                <div className="w-full h-px bg-[#3ecd5e]/40" />
                <div>
                  <p className="text-sm">
                    Designed with a premium fingerprint-resistant coating, our cases stay clean and smudge-free.
                  </p>
                </div>
              </div>
              <p className="text-md hidden md:block mt-3 z-10 para">Designed with a premium fingerprint-resistant coating, our cases stay clean and smudge-free, even with regular handling.</p>
              <div className="flex flex-row gap-2 hidden md:flex mt-2 z-10">
                <h1 className="text-[#3ecd5e] md:text-[#3ecd5e] link">See details</h1>
                <ExternalLink className="text-[#6C48C5] md:text-[#3ecd5e] size-[18px] mt-[2px] logo"></ExternalLink>
              </div>
            </div>
          </AnimatedWrapper>
          <AnimatedWrapper viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}>
            <div id="box" className="bg-gradient-to-tr from-[#FF204E]/40 to-[#FF204E]/10 md:from-white/25 md:to-white/25 md:bg-white/25 rounded-xl md:border-l-2 md:rounded-3xl md:border-gray-300 shadow-lg flex flex-row gap-2 px-4 py-5 items-start justify-start md:items-start md:justify-start relative md:flex-col overflow-hidden">
              <div id="circle" className="w-[8rem] h-[8rem] rounded-full bg-[#FF204E] overflow-hidden absolute -right-[4rem] -top-[4rem] hidden md:block"></div>
              <div className="flex-row gap-3 z-10 hidden md:flex">
                <Zap className="text-[#FF204E] md:text-[#FF204E] md:size-[30px] logo"></Zap>
                <h1 className="md:text-xl md:mt-[2px] md:text-[#FF204E] tracking-tight heading">Wireless charging compatible</h1>
              </div>
              <div className="flex-col gap-3 z-10 flex md:hidden w-full">
                <div className="flex flex-row items-center justify-between">
                  <div className="bg-white/35 backdrop-blur-lg rounded-full p-2">
                    <Zap className="text-[#FF204E] md:size-[30px] logo"></Zap>
                  </div>
                  <h1 className="md:text-xl md:mt-[2px] md:text-[#FF204E] tracking-tight heading">Wireless charging compatible</h1>
                </div>
                <div className="w-full h-px bg-[#FF204E]/40" />
                <div>
                  <p className="text-sm">
                    Our cases are designed for seamless wireless charging, allowing you to power up without removing the case.
                  </p>
                </div>
              </div>
              <p className="text-md hidden md:block mt-3 z-10 para">Our cases are designed for seamless wireless charging, allowing you to power up your device without the hassle of removing the case.</p>
              <div className="flex flex-row gap-2 hidden md:flex mt-2 z-10">
                <h1 className="text-[#FF204E] md:text-[#FF204E] link">See details</h1>
                <ExternalLink className="text-[#6C48C5] md:text-[#FF204E] size-[18px] mt-[2px] logo"></ExternalLink>
              </div>
            </div>
          </AnimatedWrapper>
          <AnimatedWrapper viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}>
            <div id="box" className="bg-gradient-to-br from-[#4F75FF]/40 to-[#4F75FF]/10 md:from-white/25 md:to-white/25 md:bg-white/25 rounded-xl md:border-l-2 md:rounded-3xl md:border-gray-300 shadow-lg flex flex-row gap-2 px-4 py-5 items-start justify-start md:items-start md:justify-start relative md:flex-col overflow-hidden">
              <div id="circle" className="w-[8rem] h-[8rem] rounded-full bg-[#4F75FF] overflow-hidden absolute -right-[4rem] -top-[4rem] hidden md:block"></div>
              <div className="flex-row gap-3 z-10 hidden md:flex">
                <Sparkles className="text-[#4F75FF] md:text-[#4F75FF] md:size-[30px] logo"></Sparkles>
                <h1 className="md:text-xl md:mt-[2px] md:text-[#4F75FF] tracking-tight heading">Matte or Glossy finish option</h1>
              </div>
              <div className="flex-col gap-3 z-10 flex md:hidden w-full">
                <div className="flex flex-row items-center justify-between">
                  <div className="bg-white/35 backdrop-blur-lg rounded-full p-2">
                    <Sparkles className="text-[#4F75FF] md:size-[30px] logo"></Sparkles>
                  </div>
                  <h1 className="md:text-xl md:mt-[2px] md:text-[#4F75FF] tracking-tight heading">Matte or Glossy finish option</h1>
                </div>
                <div className="w-full h-px bg-[#4F75FF]/40" />
                <div>
                  <p className="text-sm">
                    Choose between our elegant matte and stunning glossy finishes to match your style.
                  </p>
                </div>
              </div>
              <p className="text-md hidden md:block mt-3 z-10 para">Choose between our elegant matte and stunning glossy finishes to match your style. The matte option provides a sleek look with grip.</p>
              <div className="flex flex-row gap-2 hidden md:flex mt-2 z-10">
                <h1 className="text-[#4F75FF] md:text-[#4F75FF] link">See details</h1>
                <ExternalLink className="text-[#4F75FF] md:text-[#4F75FF] size-[18px] mt-[2px] logo"></ExternalLink>
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </div>
      <div className="md:mx-20 mt-20 md:mt-20 flex flex-col items-center justify-center">
        <h1 className="md:text-5xl text-4xl font-bold text-black text-balance tracking-tight text-center md:text-left md:text-wrap !leading-tight w-fit">Make your <span className="text-white bg-[#6C48C5] px-2 rounded-lg pt-[1px]">Own Case</span> now</h1>
        <div className="flex flex-col md:flex-row mt-20 md:mt-7 items-center gap-2 md:gap-20">
          <Image alt="Raw Image" src={isSmallScreen ? "/testimonials/7-raw.jpeg" : "/testimonials/7-org.jpeg"} width={250} height={250} className="rounded-2xl md:mt-10 shadow-2xl ring-1 ring-gray-900/10" />
          <img src="/arrow.png" alt="arrow" className="rotate-90 md:rotate-0 w-[7rem] mt-[4rem]" />
          <PhoneSkel ImgSRC="/testimonials/7-main.jpeg" dark={false}></PhoneSkel>
        </div>
      </div>
      <AnimatedWrapper>
        <div className="mx-10 flex items-center justify-center md:mt-20 mt-10">
          <div className="flex flex-row bg-[#6C48C5] text-white py-5 md:px-10 px-5 rounded-r-full rounded-l-full justify-center items-center md:w-fit gap-3 shadow-2xl" onClick={() => {
            router.push("/configure/upload")
          }}>
            <h1 className="md:mt-1">Create your case now</h1>
            <ArrowRight className='size-[18px] mt-[5px] text-white'></ArrowRight>
          </div>
        </div>
      </AnimatedWrapper>
      <Footer></Footer>
    </div>
  );
}
