import Link from "next/link"

interface backlinkProps{
    text:string,
    href:string
}
export const Backlink = ({text,href}:backlinkProps) => {
    return(
        <Link href={href} className="hover:underline hover:underline-offset-1 text-[#6C48C5] cursor-pointer">{text}</Link>
    )
}