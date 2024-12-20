import { db } from "@/lib/db"
import { auth,signOut } from "../../../auth"
const dashboard = async() => {
    const session = await auth()
    const userData = await db.user.findUnique({
        where:{email:String(session?.user?.email)}
    })
    const userId = userData?.id
    return(
        <div className="w-full min-h-screen bg-black flex items-center justify-center flex-col">
            <h1 className="text-4xl text-white">Dashboard</h1>
            <p className="text-white text-balance mt-3">{userId}</p>
            <div>
                <form action={async ()=>{
                    "use server"
                    await signOut()
                }}>
                    <button className="w-full bg-white text-black hover:bg-white/80 transition-all duration-500 px-3 py-2 rounded-xl mt-5">Log out</button>
                </form>
            </div>
        </div>
    )
}
export default dashboard