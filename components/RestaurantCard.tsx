import { View, Text, Image, TouchableOpacity } from 'react-native'
import { MapPinIcon, StarIcon } from 'react-native-heroicons/outline'
import { Strings } from '../types/types'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'

export const RestaurantCard = ({ _id, imgUrl, title, rating, genre, address, shortDescription, dishes, long, lat }: Strings) => {
  const navigation = useNavigation() as any

  const handlePress = () => {
    navigation.navigate('Restaurant', {
      _id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      shortDescription,
      dishes,
      long,
      lat
    })
  }

  return (
    <TouchableOpacity
      onPress={ handlePress }
      className='bg-white mx-1.5 shadow rounded overflow-hidden'
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className='w-64 h-36 rounded-sm'
      />

      <View className='px-3 pb-4'>
        <Text className='font-bold text-lg mt-2'>{ title }</Text>
        <View className='flex-row items-center space-x-1'>
          <StarIcon size={22} color='green' opacity={0.5} />
          <Text className='text-xs text-gray-500'>{ rating } • { genre }</Text>
        </View>
        
        <View className='flex-row items-center space-x-1'>
          <MapPinIcon size={22} color='#00CCBB' opacity={0.5} />
          <Text className='text-xs text-gray-500'>Nearby • { address.slice(0, 20) }...</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}