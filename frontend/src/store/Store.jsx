import { configureStore } from '@reduxjs/toolkit'
import UsersSlice from './UserSlice'

const store = configureStore({
  reducer:{
    user:UsersSlice
  },
})

export default store