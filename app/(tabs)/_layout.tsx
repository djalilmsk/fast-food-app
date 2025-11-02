import { Redirect, Slot } from 'expo-router';

const _layout = () => {
  const isAuthenticated = true; // Replace with your authentication logic

  if (!isAuthenticated) return <Redirect href="/log-in" />

  return <Slot />
}

export default _layout