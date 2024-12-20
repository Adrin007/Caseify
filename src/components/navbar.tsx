import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { FaAsterisk } from "react-icons/fa";
interface navBarProps{
  buttons:string
}
const Navbar = ({buttons}:navBarProps) => {
  const router = useRouter()
  const loginClickHandler = () =>{
    router.push('/auth/login')
  }
  const signinClickHandler = () =>{
    router.push('/auth/register')
  }
  return (
    <div className='sticky top-0 z-[100] border-b border-gray-200 bg-white/75 backdrop-blur-lg'>
        <div className='py-4 flex flex-row justify-between items-center'>
          <div className='ml-7 md:ml-[5rem] relative flex flex-row items-center justify-center gap-2' id='logoContainer' onClick={()=>{router.push("/")}}>
            <FaAsterisk className='rotate-90 text-[#6C48C5] w-5 h-5 logo-main transition-all duration-700 ease-in-out'/>
            <h1 className='font-bold text-xl'>CASEi<span className='text-[#6C48C5]'>FY</span></h1>
          </div>
          {buttons == "true"?(<div className='flex flex-row gap-5 mr-3 md:mr-[4rem] text-sm items-center'>
            <div className='hover:md:bg-gray-400/15 md:px-2 md:py-2 md:rounded-lg transition-colors duration-500' onClick={signinClickHandler}>
              <h1>Register</h1>
            </div>
            <div className='hover:md:bg-gray-400/15 md:px-2 md:py-2 md:rounded-lg transition-colors duration-500' onClick={loginClickHandler}>
              <h1>Login</h1>
            </div>
            <div>
            <div className="h-6 w-px bg-zinc-200 hidden sm:block"></div>
            </div>
            <div className='hidden md:block'>
              <div className='flex flex-row gap-2 bg-[#6C48C5] hover:bg-[#6C48C5]/85 transition-colors duration-500 p-2 rounded-lg'>
                <h1 className='text-white'>Get Started</h1>
                <ArrowRight className='size-[18px] mt-[1.5px] text-white'></ArrowRight>
              </div>
            </div>
          </div>):null}
        </div>
    </div>
  )
}

export default Navbar