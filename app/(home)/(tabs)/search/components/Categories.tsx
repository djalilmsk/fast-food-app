import { CATEGORIES } from "@/constants"
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native"

function Categories() {
  const [active, setActive] = useState('1');

  return (
    <View className="pt-4" style={{ paddingTop: 20 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 12,
        }}
      >
        {CATEGORIES.map(item => (
          <Pressable
            key={item.id}
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
