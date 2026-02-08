import { useMutation, useQueryClient } from "@tanstack/react-query"
import { customFetch } from "../config"

function useAddToCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const res = await customFetch.post("/cart", { productId, quantity })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    }
  })
}

export default useAddToCart
