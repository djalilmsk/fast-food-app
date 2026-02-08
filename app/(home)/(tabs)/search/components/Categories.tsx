import { CATEGORIES } from "@/constants"
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native"

function Categories() {
  const params = useLocalSearchParams()
  const [active, setActive] = useState(params.category as string || '1');
  const scrollViewRef = useRef<ScrollView>(null)
  const categoryRefs = useRef<{ [key: string]: View }>({})

  useEffect(() => {
    if (params.category) {
      setActive(params.category as string)
    }
  }, [params.category])

  useEffect(() => {
    if (active && categoryRefs.current[active]) {
      categoryRefs.current[active].measureInWindow((x, y, width, height) => {
        scrollViewRef.current?.scrollTo({ x: x - 20, animated: true })
      })
    }
  }, [active])

  return (
    <View className="pt-4" style={{ paddingTop: 20 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 16,
        }}
      >
        {CATEGORIES.map(item => (
          <Pressable
            key={item.id}
            ref={(ref) => {
              if (ref) categoryRefs.current[item.id] = ref as any
            }}
            onPress={() => setActive(item.id)}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 999,
              backgroundColor: active === item.id ? '#FF8C00' : '#FFF',
            }}
          >
            <Text
              style={{
                color: active === item.id ? '#FFF' : '#999',
                fontWeight: '600',
              }}
              className="font-quicksand-semibold"
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

export default Categories
