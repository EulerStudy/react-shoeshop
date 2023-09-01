import { createSlice } from "@reduxjs/toolkit"

const user2 = createSlice({
  name: 'user',
  initialState: { name: 'kim', age: 20 },
  reducers: {
    changeName(state) {
    state.name = 'park'
    },
    increase(state, action) {
    state.age += action.payload
    }
  }
})
export const { increase } = user2.actions

export default user2
  