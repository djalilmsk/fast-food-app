import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from '@/constants'

interface DeliveryLocationProps {
  currentAddress: string
}

const DeliveryLocation: React.FC<DeliveryLocationProps> = ({ currentAddress }) => {
  return (
    <View className='mb-5 mt-2'>
      <Text className='uppercase font-quicksand-semibold text-primary'>
        Delivery location
      </Text>
      <TouchableOpacity className="flex-row items-center gap-2 mt-1">
        <Text className='text-xl font-quicksand-bold'>
          {currentAddress}
        </Text>
        <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  )
}

export default DeliveryLocation
