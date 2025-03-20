import { RouterProvider } from "react-router-dom"
import router from "./constants/router"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}  />
            </QueryClientProvider>
        </>
    )
}

export default App
