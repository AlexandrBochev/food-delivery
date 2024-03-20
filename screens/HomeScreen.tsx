import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeView } from '../components/SafeView'
import { ChevronDownIcon, UserIcon, AdjustmentsVerticalIcon, MagnifyingGlassIcon  } from 'react-native-heroicons/outline'
import { Categories } from '../components/Categories'
import { FeaturedRows } from '../components/FeaturedRows'
import sanityClient from '../sanity'
import { Strings } from '../types/types'
import { FACE_URL } from '../constants/constants'

export const HomeScreen = () => {
  const [featuredCategories, setFeaturedCategories] = useState([])
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == "featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }
    `)
    .then((data) => {
      setFeaturedCategories(data)
    })
  }, [])

  return (
    <SafeView>
      {/* Header */}
      <View className='flex-row items-center justify-between pb-4 pt-4 px-4'>
        <View className='flex-row items-center space-x-2'>
          <Image
            source={{ uri: FACE_URL }}
            className='w-10 h-10 bg-gray-300 rounded-full'
          />
          <View>
            <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
            <View className='flex-row items-center'>
              <Text className='font-bold text-xl mr-0.5 -mt-1'>Current Location</Text>
              <ChevronDownIcon size={20} color='#00CCBB' />
            </View>
          </View>
        </View>
        <UserIcon size={32} color='#00CCBB' />
      </View>

      {/* Search */}
      <View className='flex-row items-center space-x-4 pb-3 px-4'>
        <View className='flex-row flex-1 space-x-2 items-center bg-gray-100 border border-gray-200 p-3 rounded'>
          <MagnifyingGlassIcon size={20} color='#00CCBB' />
          <TextInput placeholder='Restaurants and cuisines' keyboardType='default' />
        </View>

        <AdjustmentsVerticalIcon size={32} color='#00CCBB' />
      </View>

      {/* Body */}
      <ScrollView className='bg-gray-100'>
        {/* Categories */}
        <Categories />

        {/* Featured */}
        {featuredCategories?.map((category: Strings) =>
          <FeaturedRows
            key={category._id}
            _id={category._id}
            name={category.name}
            short_description={category.short_description}
          />
        )}
      </ScrollView>
    </SafeView>
  )  
}