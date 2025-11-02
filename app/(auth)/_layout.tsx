import { images } from '@/constants'
import { Slot } from 'expo-router'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const _layout = () => {
  return (
    <SafeAreaView>
      <View className='px-5 relative bg-dark-100 pt-10 pb-20 overflow-hidden'>
        <Image
          source={images.loginGraphic}
          className="absolute w-fill h-fill"
          resizeMode="contain"
        />
        <View>
          <Image source={images.logo} className='size-18 mb-10' resizeMode='contain' />
          <Text className='text-white-100 text-4xl font-quicksand-semibold mb-2'>Get Started now</Text>
          <Text className='text-white-100 font-quicksand-regular text-lg mt-2 font-quicksand-medium'>Create an account or log in to explore</Text>
        </View>
      </View>
      <View className='px-5 h-full rounded-t-3xl pt-10 -mt-5 bg-white'>
        <Slot />
      </View>
    </SafeAreaView>
  )
}

export default _layout