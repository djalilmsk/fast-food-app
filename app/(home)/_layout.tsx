import { useAuth } from "@/context/auth";
import { Redirect, Stack } from "expo-router"

function _layout() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthenticated, isLoading } = useAuth();

  if (!isAuthenticated && !isLoading) return <Redirect href="/log-in" />

  return <Stack screenOptions={{ headerShown: false }} />
}

export default _layout
