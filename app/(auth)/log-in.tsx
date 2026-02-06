import CustomButton from '@/components/ui/CustomButton';
import CustomInput from '@/components/ui/CustomInput';
import { Link, router } from 'expo-router';
import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { UserLogin } from '@/schemas/login';
import * as z from 'zod';
import useLogin from '@/services/auth/useLogin';

const Login = () => {
  const { handleSubmit, formState: { errors }, control } = useForm<z.infer<typeof UserLogin>>({
    resolver: zodResolver(UserLogin),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { mutate: login, isPending } = useLogin();

  const onSubmit: SubmitHandler<z.infer<typeof UserLogin>> = (data) => {
    console.log(data);
    login(data, {
      onSuccess: () => {
        Alert.alert('Success', 'Login successful!');
        router.replace('/');
      },
      onError: (error) => {
        Alert.alert('Login failed', 'An error occurred during login.');
      }
    });
  };

  const onError = (errors: any) => {
    console.log(errors);
  }

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
      <View className='flex-col gap-10 pt-10'>
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
        <CustomButton title='Log In' onPress={handleSubmit(onSubmit, onError)} disabled={isPending} loading={isPending} />
      </View>
      <View className='flex-row justify-center gap-2 pt-6'>
        <Text>Don&apos;t have an account?</Text>
        <Link href='/sign-up' className='text-primary font-quicksand-semibold'>
          <Text>Sign Up</Text>
        </Link>
      </View>
    </View>
  )
}

export default Login