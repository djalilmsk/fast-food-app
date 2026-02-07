/* eslint-disable react-hooks/rules-of-hooks */
import SuccessSheet, { SuccessSheetRef } from '@/components/SuccessSheet'
import { images } from '@/constants'
import { SuccessSheetProvider } from '@/context/SuccessSheetContext'
import { Slot } from 'expo-router'
import { Image, KeyboardAvoidingView, Platform, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useRef } from 'react'

const _layout = () => {
  const successSheetRef = useRef<SuccessSheetRef>(null!)

  return (
    <SuccessSheetProvider successSheetRef={successSheetRef}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 100}
        className='flex-1 bg-white'
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === 'android' ? 120 : 60}
          keyboardShouldPersistTaps="handled"
          keyboardOpeningTime={0}
          showsVerticalScrollIndicator={false}
        >
          <View className='relative bg-dark-100 overflow-hidden'>
            <Image
              source={images.loginGraphic}
              className="size-fill"
              resizeMode="stretch"
            />
            <View className='absolute px-5 pt-10'>
              <Image source={images.logo} className='size-18 mt-10 mb-10' resizeMode='contain' />
              <Text className='text-white-100 text-4xl font-quicksand-semibold mb-2'>Get Started now</Text>
              <Text className='text-white-100 font-quicksand-regular text-lg mt-2 font-quicksand-medium'>Create an account or log in to explore</Text>
            </View>
          </View>
          <View className='px-5 rounded-t-3xl pt-10 -mt-5 bg-white h-full'>
            <Slot />
          </View>
        </KeyboardAwareScrollView>
        <SuccessSheet ref={successSheetRef} />
      </KeyboardAvoidingView>
    </SuccessSheetProvider>
  )
}


export default _layout