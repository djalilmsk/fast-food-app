import { Image as RNImage, Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import React from 'react'
import { images } from '@/constants'

interface CartItemType {
  _id: string
  productId: string
  food: {
    name: string
    image: string
    price: number
  }
  quantity: number
  totalPrice: number
}

interface CartItemProps {
  item: CartItemType
  onQuantityChange: (newQuantity: number) => void
  onDelete: (productId: string) => void
  isDeleting: boolean
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onDelete, isDeleting }) => {
  const handleDecrement = () => {
    if (item.quantity > 0) {
      onQuantityChange(item.quantity - 1)
    }
  }

  const handleIncrement = () => {
    onQuantityChange(item.quantity + 1)
  }

  return (
    <View className='flex-row gap-4 p-4 rounded-2xl bg-white mb-3'>
      <Image source={{ uri: item.food.image }} style={{ width: 112, height: 112, borderRadius: 8, backgroundColor: '#00000024' }} contentFit="cover" />
      <View className='flex-col justify-between flex-1'>
        <Text className='font-quicksand-bold text-xl text-black'>{item.food.name}</Text>
        <Text className='font-quicksand-semibold text-lg text-primary'>{item.totalPrice.toFixed(2)} $</Text>
        <View className='flex-row items-center justify-between gap-6 mt-4'>
          <View className='flex-row items-center gap-6'>
            <Pressable className='p-1 rounded-md bg-primary/10' onPress={handleDecrement}>
              <RNImage source={images.minus} className='size-4' resizeMode='contain' />
            </Pressable>
            <Text className='font-quicksand-bold text-xl'>{item.quantity}</Text>
            <Pressable className='p-1 rounded-md bg-primary/10' onPress={handleIncrement}>
              <RNImage source={images.plus} className='size-4' resizeMode='contain' />
            </Pressable>
          </View>
          <Pressable
            onPress={() => onDelete(item.productId)}
            disabled={isDeleting}
          >
            <View style={{ opacity: isDeleting ? 0.5 : 1 }}>
              <RNImage source={images.trash} className='size-6' resizeMode='contain' />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default CartItem
