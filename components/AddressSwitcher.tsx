import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useAddress } from '@/context/address';

const AddressSwitcher = () => {
  const { address1, address2, selectedAddress, setSelectedAddress } = useAddress();

  const handleAddressSwitch = (address: 'address1' | 'address2') => {
    const addressValue = address === 'address1' ? address1 : address2;
    if (!addressValue) {
      Alert.alert('Address not available', `Please add ${address === 'address1' ? 'Address 1' : 'Address 2'} in your profile.`);
      return;
    }
    setSelectedAddress(address);
  };

  return (
    <View className='flex-col gap-3'>
      <Text className='font-quicksand-semibold text-lg'>Select Delivery Address</Text>

      {/* Address 1 */}
      <TouchableOpacity
        onPress={() => handleAddressSwitch('address1')}
        className={`p-4 rounded-lg border-2 ${selectedAddress === 'address1'
            ? 'bg-red-50 border-red-500'
            : 'border-gray-200'
          }`}
      >
        <Text className='font-quicksand-semibold text-base mb-1'>Home</Text>
        <Text className={`font-quicksand text-sm ${address1 ? 'text-gray-600' : 'text-gray-400'
          }`}>
          {address1 || 'Not added'}
        </Text>
      </TouchableOpacity>

      {/* Address 2 */}
      <TouchableOpacity
        onPress={() => handleAddressSwitch('address2')}
        className={`p-4 rounded-lg border-2 ${selectedAddress === 'address2'
            ? 'bg-red-50 border-red-500'
            : 'border-gray-200'
          }`}
      >
        <Text className='font-quicksand-semibold text-base mb-1'>Work</Text>
        <Text className={`font-quicksand text-sm ${address2 ? 'text-gray-600' : 'text-gray-400'
          }`}>
          {address2 || 'Not added'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressSwitcher;
