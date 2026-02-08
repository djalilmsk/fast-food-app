import { View } from 'react-native'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CartHeader from './components/CartHeader'
import useGetCart from '@/services/cart/useGetCart'
import { useAddress } from '@/context/address'
import CustomButton from '@/components/ui/CustomButton'
import useUpdateCart from '@/services/cart/useUpdateCart'
import useDeleteFromCart from '@/services/cart/useDeleteFromCart'
import { useDebounce } from '@/lib/useDebounce'
import DeliveryLocation from './components/DeliveryLocation'
import CartItemsList from './components/CartItemsList'
import PaymentSummary from './components/PaymentSummary'

interface CartItem {
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

const Cart = () => {
  const { data: cart, isLoading } = useGetCart()
  const items = useMemo(() => (cart?.data || []) as CartItem[], [cart?.data])
  const { currentAddress } = useAddress()

  const { mutate: updateCart } = useUpdateCart()
  const { mutate: deleteFromCart, isPending: isDeleting } = useDeleteFromCart()

  const [optimisticItems, setOptimisticItems] = useState<CartItem[]>(items)

  useEffect(() => {
    setOptimisticItems(items)
  }, [items])

  const debouncedUpdateCart = useDebounce((productId: string, quantity: number) => {
    updateCart({ productId, quantity })
  }, 500)

  const handleQuantityChange = useCallback(
    (item: CartItem, newQuantity: number) => {
      if (newQuantity < 0) return

      const updatedItem = {
        ...item,
        quantity: newQuantity,
        totalPrice: newQuantity * item.food.price,
      }

      setOptimisticItems((prev) =>
        prev.map((i) => (i._id === item._id ? updatedItem : i))
      )

      debouncedUpdateCart(item.productId, newQuantity)
    },
    [debouncedUpdateCart]
  )

  const handleDeleteFromCart = useCallback(
    (productId: string) => {
      setOptimisticItems((prev) =>
        prev.filter((item) => item.productId !== productId)
      )
      deleteFromCart({ productId })
    },
    [deleteFromCart]
  )

  const paymentSummaryFooter = useMemo(
    () => (
      <PaymentSummary items={optimisticItems} isLoading={isLoading} />
    ),
    [optimisticItems, isLoading]
  )

  return (
    <SafeAreaView className='flex-1 px-6 pt-6'>
      <CartHeader />
      <View className='flex-1'>
        <DeliveryLocation currentAddress={currentAddress || ''} />
        <CartItemsList
          items={optimisticItems}
          onQuantityChange={handleQuantityChange}
          onDelete={handleDeleteFromCart}
          isDeleting={isDeleting}
          footer={paymentSummaryFooter}
        />
      </View>
    </SafeAreaView>
  )
}

export default Cart