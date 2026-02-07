import { Image, Text, TouchableOpacity, View } from 'react-native'
import { images } from '@/constants'
import { router } from 'expo-router'
import GoBackArrow from '@/components/ui/GoBackArrow'

const ProfileHeader = () => {
  return (
    <View className='flex-row justify-between items-center pb-4'>
     <GoBackArrow />
      <Text className='font-quicksand-semibold text-xl'>Profile</Text>
      <Image source={images.search} className='h-6 w-6' style={{ tintColor: '#000' }} />
    </View>
  )
}

export default ProfileHeader
