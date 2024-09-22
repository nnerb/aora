import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import CustomButton from './custom-button';
import { router } from 'expo-router';

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className='justify-center items-center px-4'>
      <Image 
        source={images.empty}
        className='w-[200px] h-[215px]'
        resizeMode='contain'
      />
      <Text className='text-xl text-center font-psemibold text-white'>
        {title}
      </Text>
      <Text className='font-pmedium text-sm text-gray-100 mt-2'>
        {subtitle}
      </Text>
      <CustomButton
        title="Create Video"
        handlePress={() => router.push('/create')}
        containerStyles='w-full my-5'
      />
    </View>
  )
}

export default EmptyState