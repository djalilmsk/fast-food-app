import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "../config";

function useDeleteFromCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ productId }: { productId: string; }) => {
      const res = await customFetch.delete("/cart", { data: { productId } })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    }
  })
}

export default useDeleteFromCart
