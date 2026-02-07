import { useMutation } from "@tanstack/react-query"
import { customFetch } from "../config"
import { useAuth } from "@/context/auth";


function useLogout() {
  const { deleteUser } = useAuth();

  return useMutation({
    mutationFn: async () => {
      await customFetch.post("/auth/logout")
    },
    onSuccess: () => {
      deleteUser();
    },
    onError: (error) => {
      console.error("Login failed:", error);
    }
  })
}

export default useLogout
