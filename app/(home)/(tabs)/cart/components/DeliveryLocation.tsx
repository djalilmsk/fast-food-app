import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import { useAddress } from '@/context/address'

interface DeliveryLocationProps {
  currentAddress: string | null
}

const DeliveryLocation: React.FC<DeliveryLocationProps> = ({ currentAddress }) => {
  const { selectedAddress, setSelectedAddress, address1, address2 } = useAddress()

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
    <View className='mb-5 mt-2'>
      <Text className='uppercase font-quicksand-semibold text-primary'>
        Delivery location
      </Text>
      <TouchableOpacity onPress={handleAddressSwitch} className="flex-row items-center gap-2 mt-1">
        <Text className='text-xl font-quicksand-bold'>
          {currentAddress || "Please provide an address"}
        </Text>
        <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  )
}

export default DeliveryLocation
