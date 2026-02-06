import { useMutation } from "@tanstack/react-query"
import { customFetch } from "../config"
import { useAuth } from "@/context/auth";

function useLogin() {
  const { setUser } = useAuth();

  console.log('dasdoan')

  return useMutation({
    mutationFn: async (data: { email: string, password: string }) => {
      const res = await customFetch.post("/auth/login", data)
      console.log(res)
      return res.data
    },
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    }
  })
}

export default useLogin
