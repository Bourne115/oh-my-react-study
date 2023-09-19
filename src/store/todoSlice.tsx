import { createSlice } from '@reduxjs/toolkit'
import { todoStorage } from '../utils/todoStorage'
import type { ITodoItem } from '../utils/todoStorage'
import VisibilityFilters from '../constants/VisibilityFilters'

const initialState = {
  value: todoStorage.fetch(),
}

const todoSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { value: todoList } = state
      const { payload: title } = action
      const id = todoList[todoList.length - 1]?.id + 1 || 1
      state.value.push({
        id,
        title,
        completed: false,
        editing: false
      })
    },
    removeTodo: (state, action) => {
      const { value: todoList } = state
      const { payload: id } = action
      const index = todoList.findIndex((todo:ITodoItem) => todo.id === id)
      state.value.splice(index, 1)
    },
    updateTodo: (state, action) => {
      const { value:todoList } = state
      const { payload: editTodo } = action
      const todo = todoList.find((todo:ITodoItem) => todo.id === editTodo.id);
      Object.assign(todo, editTodo)
    }
  }
})
export const selectTodoList = (state:any) => state.todoList.value

export const selectFilteredTodoList = ({ visibility, todoList }:any) => {
  if (visibility === VisibilityFilters.SHOW_ALL) {
    return todoList.value;
  } else if (visibility === VisibilityFilters.SHOW_ACTIVE) {
    return todoList.value.filter((todo:ITodoItem) => todo.completed === false);
  } else {
    return todoList.value.filter((todo:ITodoItem) => todo.completed === true);
  }
};

export const selectTodoById = (state:any, id:number) => {
  return state.todoList.value.find((todo:ITodoItem) => todo.id === id);
}

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions
export default todoSlice.reducer
