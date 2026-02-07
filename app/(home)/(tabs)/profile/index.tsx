import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { useAuth } from '@/context/auth'
import ProfileHeader from './components/ProfileHeader'
import ProfileInfo from './components/ProfileInfo'
import ProfileFooter from './components/ProfileFooter'

const Profile = () => {
  const { user } = useAuth()

  return (
    <SafeAreaView className='px-6 pt-6'>
      <ProfileHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
        <ProfileInfo user={user} />
        <ProfileFooter />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile