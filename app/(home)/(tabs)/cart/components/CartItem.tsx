import { Image, Pressable, Text, View } from 'react-native'
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
      <Image source={{ uri: item.food.image }} className='size-28 rounded-lg bg-black/10' />
      <View className='flex-col justify-between flex-1'>
        <Text className='font-quicksand-bold text-xl text-black'>{item.food.name}</Text>
        <Text className='font-quicksand-semibold text-lg text-primary'>{item.totalPrice.toFixed(2)} $</Text>
        <View className='flex-row items-center justify-between gap-6 mt-4'>
          <View className='flex-row items-center gap-6'>
            <Pressable className='p-1 rounded-md bg-primary/10' onPress={handleDecrement}>
              <Image source={images.minus} className='size-4' resizeMode='contain' />
            </Pressable>
            <Text className='font-quicksand-bold text-xl'>{item.quantity}</Text>
            <Pressable className='p-1 rounded-md bg-primary/10' onPress={handleIncrement}>
              <Image source={images.plus} className='size-4' resizeMode='contain' />
            </Pressable>
          </View>
          <Pressable
            onPress={() => onDelete(item.productId)}
            disabled={isDeleting}
          >
            <View style={{ opacity: isDeleting ? 0.5 : 1 }}>
              <Image source={images.trash} className='size-6' resizeMode='contain' />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default CartItem
