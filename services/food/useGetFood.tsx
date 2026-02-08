import { useInfiniteQuery } from "@tanstack/react-query"
import { customFetch } from "../config"
import { useLocalSearchParams } from "expo-router"
import { CATEGORIES } from "@/constants"

function useGetFood() {
  const params = useLocalSearchParams()
  const categoryId = params.category as string || '1'
  const category = CATEGORIES.find(cat => cat.id === categoryId)?.name || 'All'
  const search = params.search as string || '';

  const { data, isLoading, error, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["foods", category, search],
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams: any = {
        page: pageParam,
        limit: 10,
      }
      if (category !== 'All') {
        queryParams.category = category
      }
      if (search) {
        queryParams.search = search
      }

      const res = await customFetch.get("/foods", { params: queryParams })
      return res.data
    },
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage
      if (pagination.currentPage < pagination.totalPages) {
        return pagination.currentPage + 1
      }
      return undefined
    },
    initialPageParam: 1,
  })

  // Flatten the pages into a single array of foods
  const foods = data?.pages.flatMap(page => page.data.foods) || []
  const pagination = data?.pages[data.pages.length - 1]?.pagination

  return {
    data: foods,
    isLoading,
    error,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    pagination
  }
}

export default useGetFood
