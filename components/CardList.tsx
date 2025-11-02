import { images } from '@/constants';
import React, { Fragment } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import cn from 'clsx';

const CardList = ({ item, index }: { item: any; index: number }) => {
  const XPosition = index % 2 === 0 ? "left" : "right";

  return <View>
    <Pressable className={cn("bg-amber-600 my-2 h-48 rounded-2xl items-center flex justify-between gap-2", {
      "flex-row": XPosition === "right",
      "flex-row-reverse": XPosition === "left"
    })} style={{ backgroundColor: item.color }}
      android_ripple={{ color: '#ffffff22' }}>
      {({ pressed }) => (
        <Fragment>
          <View className="h-full w-1/2">
            <Image source={item.image} className="size-full" resizeMode="cover" />
          </View>
          <View className={cn("flex-1 h-full flex flex-col justify-center", {
            "pr-10": XPosition === "right",
            "pl-10": XPosition === "left"
          })}>
            <Text className="text-white font-rubik-extrabold text-wrap text-4xl leading-tight">
              {item.title}
            </Text>
            <Image source={images.arrowRight} className="size-12" resizeMode="contain" tintColor='#ffffff' />
          </View>
        </Fragment>
      )}
    </Pressable>
  </View>
}

export default CardList