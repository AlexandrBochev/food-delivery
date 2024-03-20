import { createSlice } from '@reduxjs/toolkit'
import { RestaurantsState } from '../types/types'

const initialState: RestaurantsState = {
  restaurant: {
    _id: null,
    title: '',
    short_description: '',
    imgUrl: null,
    address: null,
    rating: null,
    genre: null,
    dishes: null,
    lat: 0,
    long: 0,
  },
}

export const restaurantSlise = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlise.actions

export const selectRestaurant = (state: { restaurant: RestaurantsState }) => state.restaurant.restaurant

export default restaurantSlise.reducer