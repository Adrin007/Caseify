/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"
import { db } from "@/lib/db"
import { auth } from "../../../../auth"
import { BASE_PRICE, PRODUCT_PRICE } from "@/components/optionsData"
import { Order } from "@prisma/client"
import { stripe } from "@/lib/stripe"
import { TailwindToast } from "@/components/tailwindToast"
import { NextResponse } from "next/server"
interface pageProps {
    configID: string
}
export const ConfigurePaymentSession = async ({ configID }: pageProps) => {
    const configuration = await db.configure.findUnique({
        where: { id: configID }
    })
    if (!configuration) {
        throw new Error("Configuration not found")
    }
    const userSession = await auth()
    if (userSession == null) {
        return {url:process.env.NEXT_PUBLIC_SERVER_URL+`/auth/login`}
    }
    const userData = await db.user.findUnique({
        where: { email: String(userSession?.user?.email) }
    })
    const { finish, material } = configuration
    let price = BASE_PRICE
    if (finish == "textured") {
        price += PRODUCT_PRICE.finish.textured
    }
    if (material == "polycarbonate") {
        price += PRODUCT_PRICE.material.polycarbonate
    }
    let order: Order | undefined = undefined
    const existingOrder = await db.order.findFirst({
        where: {
            configurationId: configuration.id,
            userId: userData?.id
        }
    })
    if (existingOrder) {
        order = existingOrder
    }
    else {
        order = await db.order.create({
            data: {
                configurationId: configuration.id,
                userId: userData!.id,
                amount: price
            }
        })
    }
    const product = await stripe.products.create({
        name: "Caseify Custom Case",
        images: [configuration.imageUrl],
        default_price_data: {
            currency: 'USD',
            unit_amount: price,
        },
    })
    let urlPrefix = process.env.NEXT_PUBLIC_SERVER_URL
    if (process.env.NODE_ENV == "production") {
        urlPrefix = process.env.NEXT_PUBLIC_SERVER_URL_PRODUCTION
    }
    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${urlPrefix}/thank-you?orderId=${order.id}`,
        cancel_url: `${urlPrefix}/configure/preview?id=${configuration.id}`,
        payment_method_types: ["card"],
        mode: "payment",
        shipping_address_collection: { allowed_countries: ["IN", "US"] },
        metadata: {
            userId: userData!.id,
            configId: configuration.id,
        },
        line_items: [{ price: product.default_price as string, quantity: 1 }]
    })
    return { url: stripeSession.url }
}