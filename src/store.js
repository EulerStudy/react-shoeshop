import { configureStore, createSlice } from '@reduxjs/toolkit'
import user2 from './store/userSlice'

const user = createSlice({
  name: 'user',
  initialState: 'kim',
  reducers: {
    changeName(state) {
      return 'jonh' + state
    }
  }
})
// export const { changeName } = user.actions

const stock = createSlice({
  name: 'stock',
  initialState: [10, 20, 30]
})

const cart = createSlice({
  name: 'cart',
  initialState: [
    {id: 0, name:'White and Black', count: 2},
    {id: 2, name:'Grey Yordan', count: 1},
  ],
  reducers: {
    addCount(state, action) {
      const idx = state.findIndex((data) => { return data.id === action.payload})
      state[idx].count++
    },
    addItem(state, action) {
      state.push(action.payload)
    }
  }
})

export const { addCount, addItem } = cart.actions

export default configureStore({
  reducer : {    
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
    user2: user2.reducer,
  }
})