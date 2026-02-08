import { View, Text, ScrollView, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@/context/auth'
import GoBackArrow from '@/components/ui/GoBackArrow'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import { Controller, useForm } from 'react-hook-form'
import { EditProfile as EditProfileSchema } from '@/schemas/editProfile'
import z from 'zod'
import CustomInput from '@/components/ui/CustomInput'
import CustomButton from '@/components/ui/CustomButton'
import useUpdateUser from '@/services/auth/useUpdateUser'
import { router } from 'expo-router'

const EditProfile = () => {
  const { user } = useAuth()
  const { handleSubmit, formState: { errors }, control } = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      address1: user?.address1 || '',
      address2: user?.address2 || '',
    }
  })

  const { mutate: update, isPending } = useUpdateUser()

  const onSubmit = (data: z.infer<typeof EditProfileSchema>) => {
    update(data, {
      onSuccess: () => {
        router.back()
      },
      onError: () => {
        Alert.alert("Error", "An unknown error occurred, please try again later.")
      }
    }
    )
  }

  const onError = (errors: any) => {
    console.log(errors);
  }

  return (
    <SafeAreaView className='px-6 pt-6 flex-1'>
      <View className='flex-row items-center mb-5'>
        <GoBackArrow />
        <Text className='font-quicksand-semibold text-xl mx-auto'>Edit Profile</Text>
        <View className='w-6' />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='flex-col gap-10 pt-10'>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <>
                <CustomInput
                  label='Full Name'
                  placeholder='Enter Your Full Name'
                  value={value}
                  onChangeText={onChange}
                  error={errors.email?.message}
                // disabled={isPending}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <>
                <CustomInput
                  label='Email'
                  placeholder='Enter Your Email'
                  value={value}
                  onChangeText={onChange}
                  error={errors.email?.message}
                  disabled={isPending}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, value } }) => (
              <>
                <CustomInput
                  label='Phone Number'
                  placeholder='Enter Your Phone Number'
                  keyboardType='numbers'
                  value={value}
                  onChangeText={onChange}
                  error={errors.phoneNumber?.message}
                  disabled={isPending}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="address1"
            render={({ field: { onChange, value } }) => (
              <>
                <CustomInput
                  label='Address 1 - (Home)'
                  placeholder='Enter Your Address 1'
                  value={value}
                  onChangeText={onChange}
                  error={errors.address1?.message}
                  disabled={isPending}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="address2"
            render={({ field: { onChange, value } }) => (
              <>
                <CustomInput
                  label='Address 2 - (Work)'
                  placeholder='Enter Your Address 2'
                  value={value}
                  onChangeText={onChange}
                  error={errors.address2?.message}
                // disabled={isPending}
                />
              </>
            )}
          />


          <CustomButton title='Save' onPress={handleSubmit(onSubmit, onError)} disabled={isPending} loading={isPending} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditProfile
