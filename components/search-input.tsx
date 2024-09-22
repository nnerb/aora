import { View, Text, TextInput, Image, TouchableOpacity  } from 'react-native'
import React, { ChangeEvent, useState } from 'react'
import { icons } from '@/constants';

interface SearchInputProps {
  title: string;
  value: string;
  handleChangeText: (value: string) => void;
  otherStyles?: string;
  keyboardType?: string;
}

const SearchInput = ({ 
  title, 
  value, 
  handleChangeText,
  otherStyles,
  keyboardType
}: SearchInputProps) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <View 
      className='
        w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row 
        border-2 border-black-200 focus:border-secondary space-x-4'
      >
      <TextInput
        className='text-base mt-0.5 text-white flex-1 font-pregular'
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword}
      />
      
      <TouchableOpacity>
        <Image
          source={icons.search}
          className='w-5 h-5'
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput