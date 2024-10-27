import { signOut } from "../../../auth"

const admin = () => {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center">
        <h1 className="text-4xl text-white">Hello Adrin</h1>
        <form action={async()=>{
            "use server"
            await signOut()
        }}>
            <button className="w-full bg-white text-black hover:bg-white/80 transition-all duration-500 px-3 py-2 rounded-xl mt-5">Log out</button>
        </form>
    </div>
  )
}

export default admin