import { images } from '@/constants'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import CartButton from './CartButton'
import { useAuth } from '@/context/auth'
import { useAddress } from '@/context/address'
import useGetCart from '@/services/cart/useGetCart'
const HomeHeader = () => {
  const { user } = useAuth()
  const { currentAddress, selectedAddress, setSelectedAddress, address1, address2 } = useAddress()

  const handleAddressSwitch = () => {
    if (selectedAddress === 'address1' && address2) {
      setSelectedAddress('address2')
    } else if (selectedAddress === 'address2' && address1) {
      setSelectedAddress('address1')
    } else if (!selectedAddress && (address1 || address2)) {
      setSelectedAddress(address1 ? 'address1' : 'address2')
    }
  }

  return (
    <View className="flex-row items-center justify-between w-full my-5">
      <View className="flex-start">
        <Text className="text-sm font-quicksand-bold text-primary">
          DELIVER TO
        </Text>
        <TouchableOpacity onPress={handleAddressSwitch} className="flex flex-row items-center gap-2">
          <Text className="text-xl font-quicksand-bold text-dark-100">{currentAddress || "Please provide an address"}</Text>
          <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <CartButton />
    </View>
  )
}

export default HomeHeader