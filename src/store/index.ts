import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import todoReducer from './todoSlice'
import visibilityReducer from './visibilitySlice'
import { todoStorage } from '../utils/todoStorage'

const storageMiddleware = store => next => action => {

  if(action.type.startsWith('todoList/')) {
    next(action)
    todoStorage.save(store.getState().todoList.value)
    return
  }
  next(action)
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todoList: todoReducer,
    visibility: visibilityReducer
  },
  middleware: gDM => gDM({serializableCheck: false}).concat(storageMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch