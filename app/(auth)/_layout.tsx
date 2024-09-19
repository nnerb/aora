import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const authNames = [
  { name: 'sign-in' },
  { name: 'sign-up'}
]

const AuthLayout = () => {
  return (
    <>
      <Stack>
        {authNames.map(({ name }) => (
          <Stack.Screen
            key={name}
            name={name}
            options={{
              headerShown: false
            }}
          />
        ))}
        
      </Stack>
      <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}

export default AuthLayout