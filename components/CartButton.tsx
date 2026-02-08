import { images } from '@/constants'
import useGetCart from '@/services/cart/useGetCart';
import { router } from 'expo-router';
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const CartButton = () => {
  const { data: cart } = useGetCart()
  const totalItems = cart?.totalItems || 0; 

  return (
    <TouchableOpacity onPress={() => { router.push("/(home)/(tabs)/cart") }}>
      <View className="bg-dark-100 rounded-full size-12 items-center justify-center">
        <Image source={images.bag} className="size-5 mr-[2px]" resizeMode="contain" />
      </View>
      {totalItems > 0 && (
        <View className="absolute -top-1 -right-2 bg-primary rounded-full size-6 items-center justify-center">
          <Text className="text-sm text-white font-quicksand-bold">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default CartButton