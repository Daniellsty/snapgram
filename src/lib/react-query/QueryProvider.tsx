import { QueryClient, QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import React from 'react'

const queryClient = new QueryClient()
const QueryProvider = ({children} : {children :React.ReactNode} ) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default QueryProvider