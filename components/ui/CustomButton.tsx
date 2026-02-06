import cn from 'clsx';
import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  textClassName?: string;
};

export default function CustomButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  fullWidth = true,
  className = '',
  textClassName = '',
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
      className={cn(
        'rounded-full bg-primary px-6 py-3 items-center justify-center',
        fullWidth ? 'w-full' : '',
        disabled ? 'bg-primary/50' : '',
        className
      )}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className={cn('text-white text-center text-base font-medium', textClassName)}>{title}</Text>
      )}
    </Pressable>
  );
}
