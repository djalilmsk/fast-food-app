import { useQuery } from "@tanstack/react-query"
import { customFetch } from "../config"

function useGetCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await customFetch.get("/cart")
      return res.data
    }
  })
}

export default useGetCart
