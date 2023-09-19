import { useState, useRef, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"

import { Link } from "react-router-dom"

import { removeTodo, updateTodo, selectFilteredTodoList } from "../../store/todoSlice"

import type { ITodoItem } from "../../utils/todoStorage"

const TodoList = () => {
  const todoList = useSelector(selectFilteredTodoList)
  const dispatch = useDispatch()

  let inputRef = useRef<HTMLInputElement>(null)
  const [cacheTodo, setCacheTodo] = useState({} as ITodoItem)

  useEffect(() => {
    if (inputRef && cacheTodo.id) {
      // ts-ignore
      inputRef.focus()
    }
  }, [cacheTodo])

  const changeTodoStatus = (e: any, currentTodo: ITodoItem) => {
    const completed = e.target.checked
    dispatch(updateTodo({ completed, id: currentTodo.id}))
  }

  const onRemoveTodoItem = (currentTodo: ITodoItem) => {
    dispatch(removeTodo(currentTodo.id))
  }

  const onEditTodo = (currentTodo: ITodoItem) => {
    todoList.forEach((item:any) => {
      item.editing = false
      updateTodo(item)
    })
    setCacheTodo(currentTodo)
    currentTodo.editing = true
    dispatch(updateTodo(currentTodo))
    
  }

  const onEditing = (e: any, editedTodo: ITodoItem) => {
    const title = e.target.value
    editedTodo.title = title
    dispatch(updateTodo(editedTodo))
  }

  const onEdited = (e: any, editedTodo: ITodoItem) => {
    if (e.keyCode === 13) {
      if (editedTodo.title === "") {
        window.alert("待办名称不能为空")
        return
      }
      editedTodo.editing = false
      dispatch(updateTodo(editedTodo))
    }
  }

  const cancelEdit = (editedTodo: ITodoItem) => {
    editedTodo.title = cacheTodo.title
    editedTodo.editing = false
    dispatch(updateTodo(editedTodo))
    setCacheTodo({} as ITodoItem) // 清空缓存 todo
  }

  const setEditInputRef = (e: any, todo: ITodoItem) => {
    if (todo.id === cacheTodo.id) {
      inputRef = e
    }
  }

  return (
    <>
      <ul className="todo-list">
        {todoList.map((todo: ITodoItem) => (
          <li
            key={todo.id}
            className={[
              todo.completed ? "completed" : "",
              todo.editing ? "editing" : "",
            ].join(" ")}
          >
            <input
              className="toggle"
              type="checkbox"
              typeof="checkbox"
              checked={todo.completed}
              onChange={(e) => {
                changeTodoStatus(e, todo)
              }}
            />
            <span onDoubleClick={() => onEditTodo(todo)} className="title">
              {todo.title}
            </span>
            <input
              type="text"
              className="edit"
              value={todo.title}
              onChange={(e) => {
                onEditing(e, todo)
              }}
              onKeyUp={(e) => {
                onEdited(e, todo)
              }}
              ref={(e) => {
                setEditInputRef(e, todo)
              }}
            />
            <div>
              <button
                className="delete-button"
                onClick={() => onRemoveTodoItem(todo)}
              >
                delete
              </button>
              <button
                className="cancel-button"
                onClick={() => cancelEdit(todo)}
              >
                cancel
              </button>
            </div>
            <Link to={`/edit/${todo.id}`}>编辑</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TodoList
