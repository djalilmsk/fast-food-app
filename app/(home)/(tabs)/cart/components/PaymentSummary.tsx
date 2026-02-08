import { Alert, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import CustomButton from '@/components/ui/CustomButton'

interface CartItem {
  totalPrice: number
}

interface PaymentSummaryProps {
  items: CartItem[]
  isLoading: boolean
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ items, isLoading }) => {
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0)
  }, [items])

  const itemCount = items.length

  return (
    <View className='border border-gray-300/80 rounded-2xl p-5 mt-4'>
      <Text className='font-quicksand-bold text-xl'>Payment Summary</Text>
      <View>
        <View className='flex-row items-center justify-between mt-4'>
          <Text className='font-quicksand-semibold text-lg text-gray-500'>Total Items ({itemCount})</Text>
          <Text className='font-quicksand-bold text-lg text-black'>{total.toFixed(2)} $</Text>
        </View>
        <View className='flex-row items-center justify-between mt-4'>
          <Text className='font-quicksand-semibold text-lg text-gray-500'>Delivery Fee</Text>
          <Text className='font-quicksand-bold text-lg text-black'>Free</Text>
        </View>
        <View className='flex-row items-center justify-between mt-5 border-t border-gray-300/80 pt-4'>
          <Text className='font-quicksand-bold text-lg text-black'>Total</Text>
          <Text className='font-quicksand-bold text-lg text-black'>{total.toFixed(2)} $</Text>
        </View>
      </View>
      <View className='mt-6'>
        <CustomButton
          title={isLoading ? 'Processing...' : 'Order Now'}
          variant='primary'
          disabled={isLoading || itemCount === 0}
          onPress={() => {
            Alert.alert('Not Available', 'Ordering functionality is not available at the moment.', [
              { text: 'OK' }
            ])
          }}
        />
      </View>
    </View>
  )
}

export default PaymentSummary
