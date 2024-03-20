import { Text, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Strings } from '../types/types'

export const CategoriesCard = ({ _id, title, imgUrl }: Strings) => {
  return (
    <TouchableOpacity className='relative rounded overflow-hidden mx-1.5 last:mr-0'>
      <Image
        source={{ uri: imgUrl }}
        className='w-20 h-20'
      />
      <View className='absolute inset-0 w-full h-full bg-black opacity-50' />
      <Text className='absolute bottom-1 left-1 text-bold text-white'>{ title }</Text>
    </TouchableOpacity>
  )
}