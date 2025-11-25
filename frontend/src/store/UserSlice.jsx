import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// First, define the reducer and action creators via `createSlice`
let userDetails=JSON.parse(localStorage.getItem('Poll'))
console.log(userDetails)
export const UsersSlice = createSlice({
  name: 'users',
  initialState: {
   users: userDetails?userDetails.user:"",
   login:userDetails?userDetails.login:false,
   token: userDetails?userDetails.token:"",
  },
  reducers: {
    usersLoggin(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      state.users=action.payload.user
      state.login=true
      state.token=action.payload.token
    
    },
    userLogOut:(state,action)=>{
    state.login=false;
    state.user=''
    state.token=''
    localStorage.removeItem('Poll')

  },
    
  },
})

// Destructure and export the plain action creators
export const { usersLoggin , userLogOut} = UsersSlice.actions
export default UsersSlice.reducer
