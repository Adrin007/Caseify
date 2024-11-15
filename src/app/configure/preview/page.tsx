/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '@/lib/db'
import React from 'react'
import PreviewPage from './designPreview'
interface PageProps {
    searchParams: {
        id?: string
    }
}
const Preview = async({ searchParams }: PageProps) => {
    const {id} = searchParams
    const orderData = await db.configure.findUnique({
        where:{id}
    })
    return (
        <div>
            <PreviewPage orderData={orderData!}></PreviewPage>
        </div>
    )
}

export default Preview