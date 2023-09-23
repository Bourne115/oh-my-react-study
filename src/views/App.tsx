import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useRequest } from 'ahooks'
import { Suspense, useEffect } from "react"

import { selectRole, setRole } from "../store/userSlice"
import { setTodoList } from '../store/todoSlice'

import reactLogo from "../assets/react.svg"
import TodoList from "./todoMvc/TodoList"
import AddTodo from "./todoMvc/AddTodo"
import TodoFilter from "./todoMvc/TodoFilter"
import Counter from "./demo/counter"

import { todoStorage } from "@/utils/todoStorage"
console.log(import.meta.env)
import "./App.scss"

const fetchTodoList = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          records: todoStorage.fetch()
        },
      })
    }
    , 3000)
  })
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

function App() {
  const role = useSelector(selectRole)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function onLogout() {
    dispatch(setTodoList([]))
    // 清空角色
    dispatch(setRole(''))
    // 跳转登录页
    navigate('/login')
  }

  const { data, loading } = useRequest(fetchTodoList)

  useEffect(() => {
    console.log(data)
    if(data?.data?.records) {
      dispatch(setTodoList(data.data.records))
    }
  }, [data])
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
      { loading && <Loading/>}
      <Suspense fallback={ <Loading/> }>
        {<AddTodo></AddTodo>}
        {<TodoList></TodoList>}
        {<TodoFilter></TodoFilter>}
      </Suspense>
    </div>
  )
}

export default App
