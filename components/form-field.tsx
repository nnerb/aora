import { View, Text, TextInput, Image, TouchableOpacity  } from 'react-native'
import React, { ChangeEvent, useState } from 'react'
import { icons } from '@/constants';

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (value: string) => void;
  otherStyles: string;
  keyboardType?: string;
}

const FormField= ({ 
  title, 
  value, 
  handleChangeText,
  otherStyles,
  keyboardType
}: FormFieldProps) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View 
        className='
          w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row 
          border-2 border-black-200 focus:border-secondary'
        >
        <TextInput
          className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder=""
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(prevStatus => !prevStatus)}>  
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              resizeMode='contain'
              className='w-6 h-6'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField