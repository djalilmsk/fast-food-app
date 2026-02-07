import { useAuth } from '@/context/auth';
import { Redirect, Tabs } from 'expo-router';

const _layout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthenticated, isLoading } = useAuth();

  if (!isAuthenticated && !isLoading) return <Redirect href="/log-in" />

  return (
    <Tabs screenOptions={{ headerShown: false }} >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
    </Tabs>
  )
}

export default _layout