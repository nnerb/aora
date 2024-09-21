import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/form-field'
import CustomButton from '@/components/custom-button'
import { Link, router } from 'expo-router'
import { createUser, getCurrentUser, signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/global-provider'
import { useGlobalStore } from '@/store/useGlobalStore'
import { UserProps } from '@/types/user'

interface FormDataProps {
  email: string;
  password: string;
}

const SignIn = () => {

  const { setUser, setIsLoggedIn } = useGlobalStore()

  const [formData, setFormData] = useState<FormDataProps>({
    email: '',
    password: ''
  })


  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (name: keyof FormDataProps, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all the fields')
      return
    }
    setIsSubmitting(true)
    try {    
      // const result = await signIn(formData.email, formData.password);
      // setUser(result)
      // setIsLoggedIn(true)
      // router.replace('/home')

      const result = await signIn(formData.email, formData.password)
      if (result) {
        const user = await getCurrentUser() // Fetch the full user data
        setUser(user as UserProps) // Ensure user is cast to UserProps
        setIsLoggedIn(true)
        router.replace('/home')
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.')
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center h-full px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-2xl text-white mt-10 font-psemibold'>
            Log in to Aora
          </Text>
          <FormField 
            title="Email"
            value={formData.email}
            handleChangeText={(value: string) => handleChange('email', value)}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={formData.password}
            handleChangeText={(value: string) => handleChange('password', value)}
            otherStyles="mt-7"
            keyboardType="password"
          />
          <CustomButton
            title="Sign In"
            handlePress={handleSubmit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account?
            </Text>
            <Link 
              href="/sign-up"
              className='text-lg font-psemibold text-secondary-100'
            >Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn