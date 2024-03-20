import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlise'
import { useMemo, useState } from 'react'
import { SafeView } from '../components/SafeView'
import { XCircleIcon } from 'react-native-heroicons/outline'
import { FACE_URL } from '../constants/constants'
import { urlFor } from '../sanity'

export const BasketScreen = () => {
  const navigation = useNavigation() as any
  const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectBasketItems)
  const basketTotal = useSelector(selectBasketTotal)
  const [groupedItems, setGroupedItems] = useState([])
  const dispatch = useDispatch()

  useMemo(() => {
    const grouped = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item)
      return results
    }, {} as any)

    setGroupedItems(grouped)
  }, [items])
  
  return (
    <SafeView>
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 border-b border-[#00CCBB] bg-white shadow'>
          <View>
            <Text className='text-lg font-bold text-center'>Basket</Text>
            <Text className='text-center text-gray-400'>{ restaurant.title }</Text>
          </View>

          <TouchableOpacity
            onPress={ navigation.goBack }
            className='rounded-full absolute top-4 right-4'
          >
            <XCircleIcon size={40} color='#00CCBB' />
          </TouchableOpacity>
        </View>

        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
          <Image
            source={{ uri: FACE_URL }}
            className='w-10 h-10 bg-gray-300 rounded-full'
          />
          <Text className='flex-1'>Deliver in 20-45 min</Text>
          <TouchableOpacity>
            <Text className='text-[#00CCBB]'>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className='divide-y divide-gray-200'>
          {Object.entries<any>(groupedItems).map(([key, value]) =>
            <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-4'>
              <Text className='text-[#00CCBB]'>{ value.length } x</Text>
              <Image
                source={{ uri: urlFor(value[0]?.imgUrl).url() }}
                className='w-20 h-20 bg-gray-300 rounded-lg'
              />
              <Text className='flex-1'>{ value[0]?.name }</Text>
              <Text className='text-gray-600 font-bold'>{ value[0]?.price } ₴</Text>
              <TouchableOpacity>
                <Text
                  onPress={ () => dispatch(removeFromBasket({ id: key })) }
                  className='text-[#00CCBB] text-xs'
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        <View className='bg-white p-4 mt-4 space-y-4'>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Subtotal</Text>
            <Text className='text-gray-400'>{ basketTotal } ₴</Text>
          </View>

          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Delivery Fee</Text>
            <Text className='text-gray-400'>{ 45 } ₴</Text>
          </View>

          <View className='flex-row justify-between'>
            <Text>Order Total</Text>
            <Text className='font-extrabold'>{ basketTotal + 45 } ₴</Text>
          </View>

          <TouchableOpacity
            onPress={ () => navigation.navigate('PreparingOrderScrean')}
            className='bg-[#00CCBB] rounded-md p-4'
          >
            <Text className='text-white text-center text-lg font-bold'>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeView>
  )
}