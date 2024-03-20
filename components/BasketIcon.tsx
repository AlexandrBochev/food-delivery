import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlise'
import { useNavigation } from '@react-navigation/native'

export const BasketIcon = () => {
  const items = useSelector(selectBasketItems)
  const navigation = useNavigation() as any
  const basketTotal = useSelector(selectBasketTotal)

  if (items.length === 0) {
    return null
  }

  return (
    <View className='absolute bottom-8 w-full z-50'>
      <TouchableOpacity
        onPress={ () => navigation.navigate('Basket') }
        className='flex-row items-center justify-between p-4 rounded-md bg-[#00CCBB] mx-4'
      >
        <Text className='text-white text-lg font-extrabold bg-[#01A296] rounded px-2'>{ items.length }</Text>
        <Text className='font-extrabold text-white text-lg'>View Basket</Text>
        <Text className='text-white text-lg font-extrabold'>{ basketTotal } ₴</Text>
      </TouchableOpacity>
    </View>
  )
}