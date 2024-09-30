import Image from 'next/image'
import React, { HTMLAttributes } from 'react'

interface PhoneProps extends HTMLAttributes<HTMLDivElement>{
    ImgSRC: string,
    dark?: boolean
}
const PhoneSkel = ({ImgSRC, dark = false, ...props}:PhoneProps) => {
  return (
    <div className={"relative overflow-hidden z-50 pt-12 select-none"} {...props}>
        <Image width={250} height={250} src={dark?"/phone-template-dark-edges.png":"/phone-template-white-edges.png"} alt="Skeleton" className='z-50'/>
        <div className='absolute inset-0 -z-10'>
            <Image width={250} height={250} src={ImgSRC} alt="User Image" className={`object-cover pt-12`}/>
        </div>
    </div>
  )
}

export default PhoneSkel