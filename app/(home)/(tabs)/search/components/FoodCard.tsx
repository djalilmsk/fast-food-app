import { images } from "@/constants"
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native"
import { useState } from "react"

function FoodCard({ food }: { food: any }) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <Pressable
      className="flex-row"
      style={{ marginBottom: 10, backgroundColor: isPressed ? '#00000013' : 'transparent', borderRadius: 18, padding: 8, margin: -8 }}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View style={{ width: 120, height: 120, backgroundColor: '#00000024', borderRadius: 10 }} />
      <View className="py-2 ml-4" style={{ flex: 1 }}>
        <Text className="font-quicksand-bold text-xl" numberOfLines={1}>{food.name}</Text>
        <Text className="font-quicksand-medium text-sm" numberOfLines={2}>{food.category} | {food.description}</Text>
        <View className="flex-row justify-between items-center" style={{ marginTop: 'auto' }}>
          <Text className="text-lg font-quicksand-semibold">{food.price}$</Text>
          <TouchableOpacity className="size-10 border rounded-full bg-white" style={{ padding: 8, borderColor: '#00000047' }}>
            <Image source={images.plus} style={{ width: 15, height: 15 }} />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  )
}

export default FoodCard
