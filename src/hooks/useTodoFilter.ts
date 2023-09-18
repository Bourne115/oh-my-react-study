import { useMemo, useState } from "react";
import type { TodoListType } from '../utils/todoStorage'

function useTodoFilter(todoList: TodoListType) {
  const [visibility, setVisibility] = useState('all')
  const filteredTodoList = useMemo(() => {
    const strategies:Record<string, () => {}> = {
      all: () => todoList,
      active: () => todoList.filter(todo => todo.completed === false),
      completed: () => todoList.filter(todo => todo.completed === true)
    }
    return strategies[visibility] && strategies[visibility]()
  }, [todoList, visibility])

  return {
    visibility,
    setVisibility,
    filteredTodoList
  }
}

export default useTodoFilter