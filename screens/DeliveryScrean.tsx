import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { SafeView } from '../components/SafeView'
import { XCircleIcon } from 'react-native-heroicons/outline'
import * as Progress from 'react-native-progress'
import MapView, { Marker } from 'react-native-maps'
import { FACE_URL } from '../constants/constants'

export const DeliveryScrean = () => {
  const navigation = useNavigation() as any
  const restaurant = useSelector(selectRestaurant)

  return (
    <View className='flex-1 bg-[#00CCBB]'>
      <View className='pt-10 shadow z-50'>
        <View className='flex-row items-center justify-between p-4'>
          <TouchableOpacity onPress={ () => navigation.navigate('Home')}>
            <XCircleIcon size={40} color='white' />
          </TouchableOpacity>

          <Text className='text-white text-lg font-light  text-center'>
            Order Help
          </Text>
        </View>

        <View className='bg-white mx-4 my-2 rounded-md p-6 shadow'>
          <View className='flex-row items-center justify-between'>
            <View>
              <Text className='text-lg text-gray-400'>Estimated Arrival</Text>
              <Text className='text-3xl font-bold'>30-45 Minutes</Text>
            </View>

            <Image
              source={require('../assets/biker.gif')}
              className='w-32 h-32'
            />
          </View>

          <Progress.Bar indeterminate={true} color='#00CCBB' />

          <Text className='mt-3 text-gray-500'>Your order at { restaurant.title } is being prepared</Text>
        </View>
      </View>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className='flex-1 -mt-10'
        mapType='mutedStandard'
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier='origin'
          pinColor='#00CCBB'
        />
      </MapView>

      <View className='flex-row items-center space-x-4 bg-white p-4'>
        <Image
          source={{ uri: FACE_URL }}
          className='w-12 h-12 bg-gray-300 rounded-full'
        />
        <View className='flex-1'>
          <Text className='text-lg'>Black Angelica</Text>
          <Text className='text-gray-400 text-sm'>You Rider</Text>
        </View>

        <TouchableOpacity>
          <Text className='text-[#00CCBB] text-lg font-bold'>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}