import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../../store/todoSlice'

export default function AddTodo() {
  const [newTodo, setNewTodo] = useState("")
  const dispatch = useDispatch()

  const changeNewTodo = (e: any) => {
    setNewTodo(e.target.value)
  }

  const onAddTodo = (e: any) => {
    if (e.keyCode === 13) {
      const title = e.target.value
      if (!title) return
      dispatch(addTodo(newTodo))
      setNewTodo("")
    }
  }


  return (
    <div
      style={{
        height: "50px",
        marginTop: "20px",
      }}
    >
      <input
        className="new-todo"
        type="text"
        autoFocus
        autoComplete="off"
        placeholder="输入要新增的代办事项"
        value={newTodo}
        onChange={changeNewTodo}
        onKeyUp={onAddTodo}
      />
    </div>
  )
}
