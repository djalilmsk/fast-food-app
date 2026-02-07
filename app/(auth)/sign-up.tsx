import CustomButton from '@/components/ui/CustomButton'
import CustomInput from '@/components/ui/CustomInput'
import { useSuccessSheet } from '@/context/SuccessSheetContext'
import { UserSignUp } from '@/schemas/signup'
import useSignup from '@/services/auth/useSignup'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import { Link, router } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Pressable, Text, View } from 'react-native'
import z from 'zod'




const SignUp = () => {
  const { successSheetRef } = useSuccessSheet();
  const { handleSubmit, formState: { errors }, control } = useForm<z.infer<typeof UserSignUp>>({
    resolver: zodResolver(UserSignUp),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  const { mutate: signup, isPending } = useSignup();

  const onSubmit = (data: z.infer<typeof UserSignUp>) => {
    const postData = {
      ...data,
      confirmPassword: data.password
    }
    signup(postData, {
      onSuccess: () => {
        successSheetRef?.current?.setMessage?.(
          "Account Created!",
          "Welcome! Your account has been successfully created."
        )
        successSheetRef?.current?.open?.();
      },
      onError: (error) => {
        Alert.alert('Signup failed', 'An error occurred during signup.');
      }
    });
  }

  const onError = (errors: any) => {
    console.log(errors);
  }


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
                error={errors.username?.message}
                disabled={isPending}
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
          name="password"
          render={({ field: { onChange, value } }) => (
            <>
              <CustomInput
                label='Password'
                placeholder='Enter Your Password'
                secureTextEntry
                value={value}
                onChangeText={onChange}
                error={errors.password?.message}
                disabled={isPending}
              />
            </>
          )}
        />
        <CustomButton title='Sign Up' onPress={handleSubmit(onSubmit, onError)} disabled={isPending} loading={isPending} />
      </View>
      <View className='flex-row justify-center gap-2 pt-6'>
        <Text>Already have an account?</Text>
        <Link href='/log-in' className='text-primary font-quicksand-semibold'>
          <Text>Log In</Text>
        </Link>
      </View>
    </View >
  )
}

export default SignUp