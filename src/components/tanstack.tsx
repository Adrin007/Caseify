"use client"
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'
const client = new QueryClient()
interface tanstackProps{
    children:React.ReactNode
}
const TanstackProvider = ({children}:tanstackProps) => {
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}

export default TanstackProvider