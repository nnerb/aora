
import CustomButton from "@/components/custom-button";
import { images } from "@/constants";
import { getCurrentUser } from "@/lib/appwrite";
import { useGlobalStore } from "@/store/useGlobalStore";
import { UserProps } from "@/types/user";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View, Image, ScrollView, Text, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  
  const { isLoading, isLoggedIn, setUser, setIsLoading } = useGlobalStore()

  // useEffect(() => {
  //   setIsLoading(true)
  //   const fetchUsers = async () => {
  //     try {
  //       const user = await getCurrentUser()
  //       if (user) {
  //         setUser(user as UserProps)
  //         setIsLoading(false)
  //       } 
  //     } catch (error) {
  //       console.log('Error fetching users')
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fetchUsers()
  // }, [])

  // if (isLoading) {
  //   return (
  //     <SafeAreaView className="bg-primary h-full justify-center items-center">
  //       <ActivityIndicator size="large" color="#ffffff" />
  //     </SafeAreaView>
  //   );
  // }

  if(!isLoading && isLoggedIn) return <Redirect href="/home" />

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Disover Endless Possibilities with <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovations: Embark on a journey of limitless exploration with Aora!
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
            textStyles=""
            isLoading={false}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}