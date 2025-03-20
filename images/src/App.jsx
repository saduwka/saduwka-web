import { QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home/Home";

const queryClient = new QueryClient(
  {defaultOptions: {
    staleTime: 5 * 60 * 1000,
    cacheTime: 10* 60 * 1000,
    refetchOnWindowsFocus: false,
    retry: 2 
  }
})

export default function App() {
  return (
    <QueryClientProvider>
      <Home />
    </QueryClientProvider>
    )
}
