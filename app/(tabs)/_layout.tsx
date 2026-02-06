import { useAuth } from '@/context/auth';
import { Redirect, Slot } from 'expo-router';

const _layout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Redirect href="/log-in" />

  return <Slot />
}

export default _layout