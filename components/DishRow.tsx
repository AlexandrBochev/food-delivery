import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Strings } from '../types/types'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlise'
import { RootState } from '../store'

export const DishRow = ({ _id, name, price, description, imgUrl }: Strings) => {
  const [isPressed, setIsPressed] = useState(false)
  const items = useSelector((state: RootState) => selectBasketItemsWithId(state, _id))
  const dispatch = useDispatch()

  const addItemToBasket = () => {
    dispatch(addToBasket({ _id, name, price, description, imgUrl }))
  }

  const removeItemFromBasket = () => {
    if (!items.length) return
    dispatch(removeFromBasket({ id: _id }))
  }

  return (
    <View className='bg-white rounded-md border border-gray-200 shadow p-4 mx-4 mb-2'>
      <TouchableOpacity onPress={ () => setIsPressed(!isPressed) }>
        <View className='flex-row'>
          <View className='flex-1 pr-2'>
            <Text className='font-bold mb-1'>{ name }</Text>
            <Text className='text-xs text-gray-400'>{ description }</Text>
            <Text className='text-gray-400 mt-2'>{ price } ₴</Text>
          </View>

          <View>
            <Image
              style={{ borderWidth: 1, borderColor: '#F3F3F3'}}
              source={{ uri: urlFor(imgUrl).url() }}
              className='w-24 h-24 bg-gray-300 rounded p-4'
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed &&
        <View className='bg-white'>
          <View className='flex-row items-center space-x-2 mt-2'>
            <TouchableOpacity
              disabled={ !items.length }
              onPress={ removeItemFromBasket }
            >
              <MinusCircleIcon size={40} color={ !items.length ? '#00CCBB' : 'gray' } />
            </TouchableOpacity>

            <Text className='font-bold text-gray-400'>{ items.length }</Text>

            <TouchableOpacity onPress={ addItemToBasket }>
              <PlusCircleIcon size={40} color='gray' />
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  )
}