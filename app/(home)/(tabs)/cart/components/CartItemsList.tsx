import { Alert, FlatList } from 'react-native'
import React from 'react'
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'

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

interface CartItemsListProps {
  items: CartItemType[]
  onQuantityChange: (item: CartItemType, newQuantity: number) => void
  onDelete: (productId: string) => void
  isDeleting: boolean
  footer: React.ReactElement | null
}

const CartItemsList: React.FC<CartItemsListProps> = ({
  items,
  onQuantityChange,
  onDelete,
  isDeleting,
  footer,
}) => {
  const handleDelete = (productId: string) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item from your cart?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          onDelete(productId)
        },
      },
    ])
  }

  return (
    <FlatList
      contentContainerClassName="pb-28"
      data={items}
      renderItem={({ item }) => (
        <CartItem
          item={item}
          onQuantityChange={(newQuantity) => onQuantityChange(item, newQuantity)}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}
      keyExtractor={(item) => item._id.toString()}
      ListEmptyComponent={<EmptyCart />}
      ListFooterComponent={items.length > 0 ? footer : null}
    />
  )
}

export default CartItemsList
