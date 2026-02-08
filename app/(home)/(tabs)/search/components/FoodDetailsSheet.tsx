import { Image, Text, View, Pressable } from 'react-native'
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react'
import CustomButton from '@/components/ui/CustomButton'
import { images } from '@/constants'
import useAddToCart from '@/services/cart/useAddToCart'

export type FoodDetailsSheetRef = {
  open: (food: any) => void
  close: () => void
}

const FoodDetailsSheet = forwardRef<FoodDetailsSheetRef>((_, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [food, setFood] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)

  const { mutate: addToCart, isPending: isAdding } = useAddToCart()

  const snapPoints = useMemo(() => ['1%', '70%'], [])

  useImperativeHandle(ref, () => ({
    open: (selectedFood: any) => {
      setFood(selectedFood)
      setQuantity(1)
      bottomSheetRef.current?.snapToIndex(1)
    },
    close: () => bottomSheetRef.current?.close(),
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
        {food && (
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
            <View className='rounded-lg p-4 mb-6'>
              <Text className='font-quicksand-semibold text-gray-700 mb-3'>Quantity</Text>
              <View className='flex-row items-center gap-4'>
                <Pressable
                  className='p-2 rounded-md bg-white border border-gray-300'
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Image source={images.minus} className='w-5 h-2' />
                </Pressable>
                <Text className='font-quicksand-bold text-lg w-12 text-center'>{quantity}</Text>
                <Pressable
                  className='p-2 rounded-md bg-white border border-gray-300'
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Image source={images.plus} className='size-5' />
                </Pressable>
                <Text className='font-quicksand-semibold text-gray-600 ml-auto'>
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
        )}
      </BottomSheetView>
    </BottomSheet>
  )
})

FoodDetailsSheet.displayName = 'FoodDetailsSheet'

export default FoodDetailsSheet
