import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const Login = () => {
  return (
    <View>
      <View className='p-1 bg-black/5 rounded-lg flex-row'>
        <View className='h-12 bg-white-100 flex justify-center items-center w-1/2 shadow-sm rounded-md' >
          <Text className='font-quicksand-semibold text-lg text-primary'>Log In</Text>
        </View>
        <Pressable onPress={() => router.push('/sign-up')} className='h-12 flex justify-center items-center w-1/2'>
          <Text className='font-quicksand-semibold text-lg text-gray-100'>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Login