import { images } from '@/constants';
import { useAuth } from '@/context/auth';
import { Redirect, Tabs } from 'expo-router';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import cn from 'clsx';

const TabIcon = ({ focused, name, icon }: { focused: boolean, name: string; icon: ImageSourcePropType }) => {
  return (
    <View className={cn('flex-col justify-center items-center h-16 w-[78px] rounded-full', focused ? 'bg-primary/20' : 'border-transparent')}>
      <Image source={icon} className='h-6 w-6' style={{ tintColor: focused ? '#FE8C00' : '#6B7280' }} />
      <Text className={cn('text-nowrap text-sm', { 'text-primary': focused, 'text-gray-500': !focused })}>{name}</Text>
    </View>
  )
}

const _layout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthenticated, isLoading } = useAuth();

  if (!isAuthenticated && !isLoading) return <Redirect href="/log-in" />

  return (
    <Tabs screenOptions={{
      headerShown: false, tabBarShowLabel: false,
      tabBarStyle: {
        height: 70,
        paddingBottom: 10,
        paddingTop: 16,
        backgroundColor: '#fff',
        borderTopWidth: 0,
        shadowColor: '#00000025',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 24,
        borderRadius: 40,
        marginHorizontal: 17,
      }
    }}>
      <Tabs.Screen name="index" options={{
        title: "Home",
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="Home" icon={images.home} />
      }} />
      <Tabs.Screen name="search" options={{ title: "Search", tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="Search" icon={images.search} /> }} />
      <Tabs.Screen name="cart" options={{ title: "Cart", tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="Cart" icon={images.bag} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="Profile" icon={images.user} /> }} />
    </Tabs>
  )
}

export default _layout