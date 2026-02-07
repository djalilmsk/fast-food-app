import { Image, Text, View } from 'react-native'
import { images } from '@/constants'
import { AuthUser } from '@/types/user'


const ProfileInfo = ({ user }: { user: AuthUser | null }) => {
  console.log(user)
  
  const infoItems = [
    {
      icon: images.user,
      label: 'Full Name',
      value: user?.username || 'N/A',
    },
    {
      icon: images.envelope,
      label: 'Email',
      value: user?.email || 'N/A',
    },
    {
      icon: images.phone,
      label: 'Phone',
      value: user?.phoneNumber || 'N/A',
    },
    {
      icon: images.location,
      label: 'Address 1 - (Home)',
      value: user?.address1 || 'N/A',
    },
    {
      icon: images.location,
      label: 'Address 2 - (Work)',
      value: user?.address2 || 'N/A',
    },
  ]

  return (
    <View className='flex-col items-center w-full pt-6'>
      <View className='relative'>
        <Image source={images.avatar} className='rounded-full' style={{ width: 120, height: 120 }} />
        <View className='bg-primary border-2 rounded-full justify-center items-center' style={{ position: 'absolute', right: 3, bottom: 3, borderColor: '#fff', width: 36, height: 36 }}>
          <Image source={images.pencil} style={{ tintColor: '#fff', width: 20, height: 20 }} />
        </View>
      </View>
      <View className='p-5 rounded-3xl shadow-sm mt-10 w-full bg-white flex-col gap-10'>
        {infoItems.map((item, index) => (
          <View key={index} className='flex-row items-center'>
            <View className='bg-primary/10 p-4 rounded-full'>
              <Image source={item.icon} className='size-6' style={{ tintColor: '#FE8C00' }} />
            </View>
            <View className='flex-col items-start ml-4'>
              <Text className='text-gray-500'>{item.label}</Text>
              <Text className='font-quicksand-bold text-lg'>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default ProfileInfo
