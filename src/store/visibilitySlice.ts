import { createSlice } from '@reduxjs/toolkit'
import VisibilityFilters from '../constants/VisibilityFilters'

export const visibilitySlice = createSlice({
  name: 'visibility',
  initialState: VisibilityFilters.SHOW_ALL,
  reducers: {
    setVisibility: (state, action) => {
      return action.payload
    }
  }
})

export const { setVisibility } = visibilitySlice.actions

export default visibilitySlice.reducer