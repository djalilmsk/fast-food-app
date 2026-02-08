import { images } from '@/constants';
import { useAuth } from '@/context/auth';
import { Redirect, Tabs } from 'expo-router';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import cn from 'clsx';
import useGetCart from '@/services/cart/useGetCart';

const TabIcon = ({ focused, name, icon, badge }: { focused: boolean, name: string; icon: ImageSourcePropType; badge?: number }) => {
  return (
    <View className={cn('flex-col justify-center items-center h-16 w-[78px] rounded-full relative', focused ? 'bg-primary/20' : 'border-transparent')}>
      <Image source={icon} className='h-6 w-6' style={{ tintColor: focused ? '#FE8C00' : '#6B7280' }} />
      {badge !== undefined && badge > 0 && !focused && (
        <View className='absolute top-2 right-6 w-5 h-5 bg-primary rounded-full flex items-center justify-center'>
          <Text className='text-white text-xs font-quicksand-bold'>{badge > 99 ? '99+' : badge}</Text>
        </View>
      )}
      <Text className={cn('text-nowrap text-sm', { 'text-primary': focused, 'text-gray-500': !focused })}>{name}</Text>
    </View>
  )
}

const Layout = () => {
  const { data: cart } = useGetCart()
  const totalItems = cart?.totalItems || 0;

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
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
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
      <Tabs.Screen name="search"
        options={{ title: "Search", tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="Search" icon={images.search} /> }}
      />
      <Tabs.Screen name="cart"
        options={{ title: "Cart", tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="Cart" icon={images.bag} badge={totalItems} /> }}
      />
      <Tabs.Screen name="profile"
        options={{ title: "Profile", tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="Profile" icon={images.person} /> }}
      />
    </Tabs>
  )
}

export default Layout