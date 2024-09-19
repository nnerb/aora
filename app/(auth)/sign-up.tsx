import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/form-field'
import CustomButton from '@/components/custom-button'
import { Link } from 'expo-router'

interface FormDataProps {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {

  const [formData, setFormData] = useState<FormDataProps>({
    username: '',
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

  const handleSubmit = () => {

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
            title="Username"
            value={formData.username}
            handleChangeText={(value: string) => handleChange('username', value)}
            otherStyles="mt-7"
          />
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
          />
          <CustomButton
            title="Sign In"
            handlePress={handleSubmit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Have an account already?
            </Text>
            <Link 
              href="/sign-in"
              className='text-lg font-psemibold text-secondary-100'
            >
              Sign In
            </Link>
          </View>
        </View>
       
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp