/* eslint-disable @typescript-eslint/no-unused-vars */
import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_KEY ?? "",{
    apiVersion:"2024-10-28.acacia",
    typescript:true
})