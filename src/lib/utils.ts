import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price:number,type:string) => {
  const formatter = new Intl.NumberFormat('en-US',{
    style:"currency",
    currency:type.toUpperCase()
  })
  if(type == "usd"){
    return formatter.format(price/84.38)
  }
  if(type == "eur"){
    return formatter.format(price/90.46)
  }
  return formatter.format(price)
}