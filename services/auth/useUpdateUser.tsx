import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../config";
import { useAuth } from "@/context/auth";
import { AuthUser } from "@/types/user";

function useUpdateUser() {
  const { setUser } = useAuth()

  return useMutation({
    mutationFn: async (data: Omit<AuthUser, '_id'>) => {
      const res = await customFetch.patch("/auth/update", data)
      return res.data.data
    },
    onSuccess: (data) => {
      setUser(data.data)
    },
    onError: (error) => {
      console.error("Login failed:", error);
    }
  })
}

export default useUpdateUser
