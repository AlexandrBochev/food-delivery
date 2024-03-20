import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeView } from '../components/SafeView'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native'

export const PreparingOrderScrean = () => {
  const navigation = useNavigation() as any

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('DeliveryScrean')
    }, 4000)
  }, [])

  return (
    <SafeView>
      <View className='flex-1 items-center justify-center'>
        <Animatable.Image
          source={require('../assets/preparing-order.gif')}
          animation='slideInUp'
          iterationCount={1}
          className='w-96 h-96'
        />

        <Animatable.Text
          animation='slideInUp'
          iterationCount={1}
          className='text-2xl font-bold text-[#00CCBB] text-center mt-5'
        >
          Wating for your order!
        </Animatable.Text>

        <Progress.Circle
          size={40}
          indeterminate={true}
          color='#00CCBB'
          className='mt-10'
        />
      </View>
    </SafeView>
  )
}