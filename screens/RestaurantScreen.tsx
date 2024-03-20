import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useLayoutEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { urlFor } from '../sanity'
import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/outline'
import { RestaurantsState, Strings } from '../types/types'
import { DishRow } from '../components/DishRow'
import { BasketIcon } from '../components/BasketIcon'
import { useDispatch } from 'react-redux'
import { setRestaurant } from '../features/restaurantSlice'

export const RestaurantScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const {
    params: { _id, imgUrl, title, rating, genre, address, shortDescription, dishes, long, lat }
  } = useRoute() as any

  useEffect(() => {
    dispatch(setRestaurant({ _id, imgUrl, title, rating, genre, address, shortDescription, dishes, long, lat }))
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <>
      <BasketIcon />
      
      <ScrollView>
        <View className='relative'>
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className='w-full h-56 bg-gray-300 p-4'
          />
          <TouchableOpacity
            onPress={ () => navigation.goBack() }
            className='absolute top-16 left-6 bg-gray-100 rounded-full p-2'
          >
            <ArrowLeftIcon size={20} color='#00CCBB' />
          </TouchableOpacity>
        </View>

        <View className='bg-white'>
          <View className='px-4 pt-4'>
            <Text className='text-3xl font-bold'>{ title }</Text>

            <View className='flex-row space-x-2 my-1'>
              <View className='flex-row items-center space-x-1'>
                <StarIcon size={22} color='green' opacity={0.5} />
                <Text className='text-xs text-gray-500'>{ rating } • { genre }</Text>
              </View>

              <View className='flex-row items-center space-x-1'>
                <MapPinIcon size={22} color='#00CCBB' opacity={0.5} />
                <Text className='text-xs text-gray-500'>Nearby • { address.slice(0, 20) }...</Text>
              </View>
            </View>

            <Text className='text-gray-500 mt-2 pb-4'>{ shortDescription }</Text>
          </View>

          <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
            <QuestionMarkCircleIcon color='gray' opacity={0.6} size={20} />
            <Text className='pl-2 flex-1 text-md'>Have a food allergy?</Text>
            <ChevronRightIcon color='#00CCBB' />
          </TouchableOpacity>
        </View>

        <View className='pb-24'>
          <Text className='px-4 pt-4 mb-3 font-bold text-xl'>Menu</Text>

          {/* Dishrows */}
          {dishes?.map((dish: Strings) =>
            <DishRow
              key={dish._id}
              _id={dish._id}
              name={dish.name}
              price={dish.price}
              description={dish.short_description}
              imgUrl={dish.image}
            />
          )}
        </View>
      </ScrollView>
    </>
  )
}