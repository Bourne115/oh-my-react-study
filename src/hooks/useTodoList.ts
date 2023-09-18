import { useState } from "react";
import type { ITodoItem } from '../utils/todoStorage'

export default function useTodoList(data: ITodoItem[]) {
  const [todoList, setTodoList] = useState(data)

  const addTodo = (title: string) => {
    const newTodoList = [...todoList, {
      id: todoList.length + 1,
      title,
      completed: false,
      editing: false,
    }]
    setTodoList(newTodoList)
  }

  const removeTodo = (id: number) => {
    const newTodoList = todoList.filter(todo => todo.id !== id)
    setTodoList(newTodoList)
  }

  const updateTodo = (editTodo:ITodoItem) => {
    const todo = todoList.find(todo => todo.id === editTodo.id)
    if(todo) Object.assign(todo, editTodo)
    setTodoList([...todoList])
  }

  return { addTodo, removeTodo, updateTodo, todoList, setTodoList }
}
