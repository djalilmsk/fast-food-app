import { images } from '@/constants'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const CartButton = () => {
  const totalItems = 3; // Example item count

  return (
    <TouchableOpacity>
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