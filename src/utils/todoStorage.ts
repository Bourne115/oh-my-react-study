const STORAGE_KEY = 'todo-mvc-react'

export interface ITodoItem {
  id: number
  title: string
  completed: boolean,
  editing: boolean,
}

export type TodoListType = ITodoItem[]

export const todoStorage = {
  fetch() {
    const todoList = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return todoList
  },
  save(todoList: TodoListType) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList))
  }
}