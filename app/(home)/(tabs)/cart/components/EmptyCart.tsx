import { Image, Text, View } from 'react-native'
import React from 'react'
import { images } from '@/constants'

const EmptyCart: React.FC = () => {
  return (
    <View className='flex-1 justify-center items-center mt-20'>
      <Image
        source={images.emptyCart}
        style={{ width: 150 * 1.4, height: 120 * 1.4, marginBottom: 20 }}
      />
      <Text className='font-quicksand-bold pb-4' style={{ fontSize: 20, color: '#000', textAlign: 'center' }}>
        Your cart is empty
      </Text>
      <Text className='font-quicksand-medium mx-12' style={{ fontSize: 15, color: '#999', textAlign: 'center' }}>
        Browse our menu and add delicious food to your cart!
      </Text>
    </View>
  )
}

export default EmptyCart
