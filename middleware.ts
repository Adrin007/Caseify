/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { ApiRoutes, AuthRoutes, DefaultLoginRoute, PublicRoutes } from "./routes";
const {auth} = NextAuth(authConfig)

export default auth(async(request)=>{
    const isLoggedIn = !!request.auth
    const session  = await auth()
    const userEmail = session?.user?.email
    const isApiRoute = request.nextUrl.basePath.startsWith(ApiRoutes)
    const isAuthRoute = AuthRoutes.includes(request.nextUrl.pathname)
    const isPublicRoute = PublicRoutes.includes(request.nextUrl.pathname)   
    const config = localStorage.getItem("configId")
    if(isApiRoute){
        return
    }
    if(isAuthRoute){
        if(isLoggedIn && (userEmail != process.env.ADMIN_EMAIL)){
            return Response.redirect(new URL(DefaultLoginRoute,request.nextUrl))
        }
        else if(isLoggedIn && (userEmail == process.env.ADMIN_EMAIL)){
            return Response.redirect(new URL("/admin",request.nextUrl))
        }
        return
    }
    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/auth/login",request.nextUrl))
    }
    return
})
export const config = {
    matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)','/(api|trpc)(.*)',]
}