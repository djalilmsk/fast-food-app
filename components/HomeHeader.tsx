import { images } from '@/constants'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import CartButton from './CartButton'
import { useAuth } from '@/context/auth'

const HomeHeader = () => {
  const { user } = useAuth()

  return (
    <View className="flex-row items-center justify-between w-full my-5">
      <View className="flex-start">
        <Text className="text-sm font-quicksand-bold text-primary">
          DELIVER TO
        </Text>
        <TouchableOpacity className="flex flex-row items-center gap-2">
          <Text className="text-xl font-quicksand-bold text-dark-100">{user?.address1 || user?.address2 || "Please provide an address"}</Text>
          <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <CartButton />
    </View>
  )
}

export default HomeHeader