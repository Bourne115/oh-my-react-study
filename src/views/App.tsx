import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectRole, setRole } from "../store/userSlice"

import reactLogo from "../assets/react.svg"
import TodoList from "./todoMvc/TodoList"
import AddTodo from "./todoMvc/AddTodo"
import TodoFilter from "./todoMvc/TodoFilter"
import Counter from "./demo/counter"

import "./App.scss"

function App() {
  const role = useSelector(selectRole)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function onLogout() {
    // 清空角色
    dispatch(setRole(''))
    // 跳转登录页
    navigate('/login')
  }

  return (
    <div className="App">
      <div>
        你好, {role}
        <button onClick={onLogout}>注销</button>
      </div>
      <header>
        <Counter></Counter>
        <h1>我的待办事项</h1>
        <img src={reactLogo}/>
      </header>
      {<AddTodo></AddTodo>}
      {<TodoList></TodoList>}
      {<TodoFilter></TodoFilter>}
    </div>
  )
}

export default App
