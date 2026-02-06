import cn from 'clsx';
import React from "react";
import { Image, ImageSourcePropType, Pressable, Text, TextInput, View } from "react-native";

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  leftIcon?: ImageSourcePropType | null;
  rightIcon?: ImageSourcePropType | null;
  onRightPress?: () => void;
  error?: string | null;
  label?: string | null;
  containerClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
};

export default function CustomInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  leftIcon = null,
  rightIcon = null,
  onRightPress,
  error = null,
  label = null,
  containerClassName = "",
  inputClassName = "",
  disabled = false,
}: Props) {
  return (
    <View className={`w-full ${containerClassName}`}>
      {label ? (
        <Text className="font-quicksand-semibold text-gray-100 mb-1">{label}</Text>
      ) : null}

      <View
        className={cn(
          "flex-row items-center border-b",
          inputClassName ? "" : "py-2",
          error ? "border-error" : "border-gray-300"
        )}
      >
        {leftIcon ? (
          <Image source={leftIcon} className="w-5 h-5 mr-2" resizeMode="contain" />
        ) : null}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          className={cn(`flex-1 text-base text-dark-100 px-2 py-1 font-quicksand-semibold`, inputClassName)}
          editable={!disabled}
        />

        {rightIcon ? (
          <Pressable onPress={onRightPress} className="ml-2 p-1">
            <Image source={rightIcon} className="w-5 h-5" resizeMode="contain" />
          </Pressable>
        ) : null}
      </View>

      {error ? <Text className="mt-1 text-sm text-error">{error}</Text> : null}
    </View>
  );
}
