import { router } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

const SignUp = () => {
  return (
    <View>
      <View className='p-1 bg-black/5 rounded-lg flex-row'>
        <Pressable className='h-12 flex justify-center items-center w-1/2' onPress={() => router.push('/log-in')}>
          <Text className='font-quicksand-semibold text-lg text-gray-100'>Log In</Text>
        </Pressable>
        <View className='h-12 bg-white-100 flex justify-center items-center w-1/2 shadow-sm rounded-md'>
          <Text className='font-quicksand-semibold text-lg text-primary'>Sign Up</Text>
        </View>
      </View>
    </View>
  )
}

export default SignUp