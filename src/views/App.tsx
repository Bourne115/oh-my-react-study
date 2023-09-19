import reactLogo from "../assets/react.svg"
import TodoList from "./todoMvc/TodoList"
import AddTodo from "./todoMvc/AddTodo"
import TodoFilter from "./todoMvc/TodoFilter"
import Counter from "./demo/counter"

import "./App.scss"

function App() {
  return (
    <div className="App">
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
