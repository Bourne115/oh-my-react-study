import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    photo: '',
    role: 'admin'
  },
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.photo = action.payload.photo
      state.role = action.payload.role
    },
    setRole(state, action) {
      state.role = action.payload
    }
  }
})
export const selectRole = (state: any) => state.user.role
export const selectLogin = (state: any) => !!state.user.role

export const { setRole } = userSlice.actions

export default userSlice.reducer