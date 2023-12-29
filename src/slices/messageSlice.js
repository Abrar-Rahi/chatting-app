import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    value: localStorage.getItem("msg") ? JSON.parse(localStorage.getItem("msg")) : ""  ,
  },
  reducers: {
    msgInfo: (state,action) => {
      
        state.value = action.payload
      
    },
    
  },
})


export const { msgInfo } = messageSlice.actions

export default messageSlice.reducer