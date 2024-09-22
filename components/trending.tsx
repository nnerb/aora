import { Alert, FlatList, Image, ImageBackground, Text, TextStyle, TouchableOpacity, ViewStyle, ViewToken } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from "react-native-animatable"
import { PostProps } from '@/types/post'
import { icons } from '@/constants'
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av"

interface TrendingProps {
  posts: PostProps[]
}

interface TrendingItemProps {
  activeItem: PostProps
  item: PostProps
}

interface ViewableItemsInfo<ItemT> {
  viewableItems: Array<ViewToken<ItemT>>;
}


const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {

  const [play, setPlay] = useState(false)

  const zoomIn = {
    from: {
      transform: [{ scale: 0.9 }],
    },
    to: {
      transform: [{ scale: 1.1 }],
    },
  }

  const zoomOut = {
    from: {
      transform: [{ scale: 1.1 }],
    },
    to: {
      transform: [{ scale: 0.9 }],
    },
  }

  return (
    <Animatable.View
      className='mr-5'
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
          <Video 
            source={{ uri: item.video }}
            className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
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
            className='relative justify-center items-center'
            activeOpacity={0.7} 
            onPress={() => setPlay(true)}
          >
            <ImageBackground
              source={{ uri: item.thumbnail }}
              className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black-40'
            />
            <Image
              source={icons.play}
              className='w-12 h-12 absolute'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )
      }
    </Animatable.View>
  )
}

const Trending = ({ posts }: TrendingProps) => {

  const [activeItem, setActiveItem] = useState(posts[1])

  const viewableItemsChanged = ({ viewableItems } : ViewableItemsInfo<PostProps>) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item)
    }
  }

  return (
   <FlatList
    data={posts}
    keyExtractor={(item) => item.$id}
    renderItem={({ item }) => (
      <TrendingItem activeItem={activeItem} item={item}/>
    )}
    horizontal
    onViewableItemsChanged={viewableItemsChanged}
    viewabilityConfig={{
      itemVisiblePercentThreshold: 70
    }}
    contentOffset={{ x: 170, y: 0 }}
   />
  )
}

export default Trending