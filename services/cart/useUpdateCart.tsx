import { useMutation, useQueryClient } from "@tanstack/react-query"
import { customFetch } from "../config"

function useUpdateCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const res = await customFetch.patch("/cart", { productId, quantity })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    }
  })
}

export default useUpdateCart
