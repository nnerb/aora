import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'
import { PostProps } from '@/types/post'

interface VideoCardProps {
  item: PostProps
}

const VideoCard = ({ item }: VideoCardProps) => {

  const [play, setPlay] = useState(false)

  return (
    <View className='flex-col items-center px-4 mb-14'>
      <View className='flex-row gap-3 items-start'>
        <View className='justify-center items-center flex-row flex-1'>
          <View 
            className='w-[46px] h-[46px] 
            rounded-lg border border-secondary 
            justify-center items-center p-0.5'
          >
            <Image
              source={{ uri: item.users.avatar }}
              className='w-full h-full rounded-lg'
              resizeMode='cover'
            />
          </View>
          <View className='justify-center flex-1 ml-3 gap-y-1'>
            <Text 
              className='text-white font-psemibold'
              numberOfLines={1}
            >
              {item.title}
          </Text>
          <Text
            className='text-xs text-gray-100 font-pregular'
            numberOfLines={1}
          >
            {item.users.username}
          </Text>
          </View>
        </View>
        <View className='pt-2'>
          <Image
            source={icons.menu}
            className='w-5 h-5'
            resizeMode='contain'
          />
        </View>
      </View>
      {play ? (
        <Video 
          source={{ uri: item.video }}
          className="w-full h-60 rounded-xl pt-35"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              if (status.didJustFinish) {
                setPlay(false)
              }
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className='relative w-full h-60 justify-center items-center rounded-xl mt-3'
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: item.thumbnail }}
            className='w-full h-full rounded-xl mt-3'
            resizeMode='cover'
          />
          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default VideoCard