import cn from 'clsx';
import React from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  textClassName?: string;
  variant?: 'primary' | 'secondary' | 'destructive' | 'secondary destructive';
  icon?: any;
};

export default function CustomButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  fullWidth = true,
  className = '',
  textClassName = '',
  variant = 'primary',
  icon,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [{ opacity: pressed && !disabled ? 0.7 : disabled ? 0.5 : 1 }]}
      className={cn(
        'rounded-full px-6 py-3 items-center justify-center',
        variant === 'primary' && 'bg-primary',
        variant === 'secondary' && 'border border-primary bg-primary/5',
        variant === 'destructive' && 'bg-error',
        variant === 'secondary destructive' && 'border border-error bg-error/5',
        fullWidth ? 'w-full' : '',
        className
      )}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'destructive' ? '#fff' : variant === 'secondary' ? '#FE8C00' : '#E74C3C'} />
      ) : (
        <View className={cn('flex-row items-center', icon && 'space-x-2')}>
          {
            icon &&
            <View>
              <Image source={icon} className={cn((variant === 'primary' || variant === 'destructive') && 'text-white',
                variant === 'secondary' && 'text-primary',
                variant === 'secondary destructive' && 'text-error', "size-6 mr-2")} />
            </View>
          }
          <Text className={cn(
            'text-center text-lg font-quicksand-bold',
            (variant === 'primary' || variant === 'destructive') && 'text-white',
            variant === 'secondary' && 'text-primary',
            variant === 'secondary destructive' && 'text-error',
            textClassName
          )}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}
