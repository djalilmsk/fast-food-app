import { useQuery } from "@tanstack/react-query"
import { customFetch } from "../config"

function useGetFood() {
  return useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await customFetch.get("/foods")
      return res.data.data.foods
    }
  })
}

export default useGetFood
