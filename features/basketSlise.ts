import { createSlice } from '@reduxjs/toolkit'
import { BasketState } from '../types/types'

const initialState: BasketState = {
  items: [],
}

export const basketSlise = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(item => item._id === action.payload.id)
      let newBasket = [...state.items]
      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn(`Can't remove product (id: ${action.payload.id}) as it's not in the basket!`)
      }
      state.items = newBasket
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlise.actions

export const selectBasketItems = (state: { basket: BasketState }) =>
  state.basket.items

export const selectBasketItemsWithId = (state: { basket: BasketState }, id: string) =>
  state.basket.items.filter(item => item._id === id)

export const selectBasketTotal = (state: { basket: BasketState }) =>
  state.basket.items.reduce((total, item) => total += item.price, 0)

export default basketSlise.reducer