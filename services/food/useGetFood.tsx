import { useQuery } from "@tanstack/react-query"
import { customFetch } from "../config"
import { useLocalSearchParams } from "expo-router"
import { CATEGORIES } from "@/constants"

function useGetFood() {
  const params = useLocalSearchParams()
  const categoryId = params.category as string || '1'
  const category = CATEGORIES.find(cat => cat.id === categoryId)?.name || 'All'
  const search = params.search as string || '';

  return useQuery({
    queryKey: ["foods", category, search],
    queryFn: async () => {
      const queryParams: any = {}
      if (category !== 'All') {
        queryParams.category = category
      }
      if (search) {
        queryParams.search = search
      }

      const res = await customFetch.get("/foods", { params: queryParams })
      return res.data.data.foods
    }
  })
}

export default useGetFood
