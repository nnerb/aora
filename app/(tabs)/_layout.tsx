import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from "../../constants"

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean
}

interface TabIconDetailsProps {
  name: string;
  title: string;
  icon: ImageSourcePropType
}

const tabIconDetails: TabIconDetailsProps[] = [
  { name: 'home', title: 'Home', icon: icons.home },
  { name: 'bookmark', title: 'Bookmark', icon: icons.bookmark },
  { name: 'create', title: 'Create', icon: icons.plus },
  { name: 'profile', title: 'Profile', icon: icons.profile }
]

const TabIcon = ({ icon, color, name, focused, } : TabIconProps) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image 
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84
          }
        }}
      >
        {
          tabIconDetails.map((detail) => (
            <Tabs.Screen 
              key={detail.name}
              name={detail.name}
              options={{
              title: detail.title,
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={detail.icon}
                  color={color}
                  name={detail.title}
                  focused={focused}
                />
              )
            }}
          />
          ))
        }
       
      </Tabs>
    </>
  )
}

export default TabsLayout