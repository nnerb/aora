import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex items-center justify-center h-full">
      <Text className="text-3xl font-black">Aora!</Text>
      <Link href="/home" style={{ color: 'blue' }}>Go to Home</Link>
    </View>
  )
}