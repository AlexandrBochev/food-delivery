import { View, Text, ScrollView } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import { RestaurantCard } from './RestaurantCard'
import { Strings } from '../types/types'
import { useEffect, useState } from 'react'
import sanityClient from '../sanity'

export const FeaturedRows = ({ _id, name, short_description }: Strings) => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == "featured" && _id == "${_id}"] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type->{
            name
          },
        },
      }[0]
    `, { _id })
    .then((data) => {
      setRestaurants(data?.restaurants)
    })
  }, [_id])

  return (
    <View>
      <View className='flex-row items-center justify-between mt-4 px-4'>
        <Text className='font-bold text-lg'>{ name }</Text>
        <ArrowRightIcon color='#00CCBB' />
      </View>

      <Text className='text-xs text-gray-500 px-4'>{ short_description }</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          padding: 10,
        }}
      >
        {/* RestaurantCard */}
        {restaurants?.map((restaurant: Strings & { type: { name: string } }) =>
          <RestaurantCard
            key={restaurant._id}
            _id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type.name}
            address={restaurant.address}
            shortDescription={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        )}
      </ScrollView>
    </View>
  )
}