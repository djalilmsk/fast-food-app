import { Image, Text, View, Pressable, ActivityIndicator } from 'react-native'
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState, useEffect } from 'react'
import CustomButton from '@/components/ui/CustomButton'
import { images } from '@/constants'
import useAddToCart from '@/services/cart/useAddToCart'
import useGetCart from '@/services/cart/useGetCart'

export type FoodDetailsSheetRef = {
  open: (food: any) => void
  close: () => void
}

const FoodDetailsSheet = forwardRef<FoodDetailsSheetRef>((_, ref) => {
  const { data: cart, isLoading: isCartLoading } = useGetCart()
  const [food, setFood] = useState<any>(null)

  const bottomSheetRef = useRef<BottomSheet>(null)
  const isOpenRef = useRef(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    console.log('Effect running - Food:', food?._id, 'Cart loading:', isCartLoading)
    console.log('Full cart object:', JSON.stringify(cart, null, 2))

    if (food && cart && !isCartLoading) {
      // Try different cart structures
      const items = cart.items || cart.data || cart
      const foodInCart = items?.find?.((item: any) => item.productId === food._id)
      setQuantity(foodInCart ? foodInCart.quantity : 1)
    }
  }, [food, cart, isCartLoading])

  const { mutate: addToCart, isPending: isAdding } = useAddToCart()

  const snapPoints = useMemo(() => ['1%', '70%'], [])

  useImperativeHandle(ref, () => ({
    open: (selectedFood: any) => {
      isOpenRef.current = true
      setFood(selectedFood)
      bottomSheetRef.current?.snapToIndex(1)
    },
    close: () => {
      isOpenRef.current = false
      bottomSheetRef.current?.close()
    },
  }))

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  )

  const handleAddToCart = () => {
    if (food) {
      addToCart({ productId: food._id, quantity })
      bottomSheetRef.current?.close()
    }
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      enableHandlePanningGesture={true}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView className='flex-1 bg-white'>
        {isCartLoading ? (
          <View className='flex-1 justify-center items-center'>
            <ActivityIndicator size="large" color="#FF8C00" />
          </View>
        ) : food ? (
          <View className='flex-1 px-6 py-6'>
            {/* Food Image */}
            <Image
              source={{ uri: food.image }}
              className='w-full h-48 rounded-lg mb-6 bg-gray-200'
            />

            {/* Food Info */}
            <View className='mb-6'>
              <View className='flex-row items-start justify-between mb-2'>
                <Text className='font-quicksand-bold text-2xl flex-1'>{food.name}</Text>
                <Text className='font-quicksand-bold text-xl text-primary ml-2'>${food.price.toFixed(2)}</Text>
              </View>
              <Text className='font-quicksand-medium text-gray-600 mb-4'>{food.category}</Text>
              <Text className='font-quicksand-medium text-gray-700'>{food.description}</Text>
            </View>

            {/* Quantity Selection */}
            <View className='rounded-lg py-4 mb-6'>
              <Text className='font-quicksand-semibold text-gray-700 mb-3'>Quantity</Text>
              <View className='flex-row items-center gap-4'>
                <Pressable
                  className='p-2 py-4 rounded-md bg-white border border-gray-300'
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Image source={images.minus} className='w-5 h-1' />
                </Pressable>
                <Text className='font-quicksand-bold text-lg w-12 text-center'>{quantity}</Text>
                <Pressable
                  className='p-2 rounded-md bg-white border border-gray-300'
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Image source={images.plus} className='size-5' />
                </Pressable>
                <Text className='font-quicksand-semibold text-gray-600 text-xl ml-auto'>
                  Total: ${(food.price * quantity).toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Add to Cart Button */}
            <View className='mt-auto'>
              <CustomButton
                title={isAdding ? 'Adding...' : 'Add to Cart'}
                variant='primary'
                disabled={isAdding}
                onPress={handleAddToCart}
              />
            </View>
          </View>
        ) : null}
      </BottomSheetView>
    </BottomSheet>
  )
})

FoodDetailsSheet.displayName = 'FoodDetailsSheet'

export default FoodDetailsSheet
