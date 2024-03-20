import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from './screens/HomeScreen'
import { RestaurantScreen } from './screens/RestaurantScreen'
import { store } from './store'
import { Provider } from 'react-redux'
import { BasketScreen } from './screens/BasketScreen'
import { PreparingOrderScrean } from './screens/PreparingOrderScrean'
import { DeliveryScrean } from './screens/DeliveryScrean'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={ HomeScreen } />
          <Stack.Screen name='Restaurant' component={ RestaurantScreen } />
          <Stack.Screen
            name='Basket'
            component={ BasketScreen }
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen
            name='PreparingOrderScrean'
            component={ PreparingOrderScrean }
            options={{ presentation: 'fullScreenModal', headerShown: false }}
          />
          <Stack.Screen
            name='DeliveryScrean'
            component={ DeliveryScrean }
            options={{ presentation: 'fullScreenModal', headerShown: false }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}