import { useAuth } from "@/context/auth";
import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../config";

function useSignup() {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: async (data: { username: string, email: string, password: string }) => {
      const res = await customFetch.post("/auth/register", data)
      console.log(res)
      return res.data
    },
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    }
  })
}

export default useSignup
