import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'

const Index = () => {
  return (
    <View className="flex h-full justify-center items-center">
      <Text className="text-3xl font-black">Aora!</Text>
      <Link href="/profile" style={{ color: 'blue' }}>Go to Profile</Link>
    </View>
  )
}

export default Index

