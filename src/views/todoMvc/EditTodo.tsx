import { useParams, Form, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectTodoById } from "../../store/todoSlice"

export default function EditTodo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const todo = useSelector((state: any) => selectTodoById(state, Number(id)))

  return (
    <Form method="post">
      <p>
        <label>
          <span>name: </span>
          <input type="text" name="title" defaultValue={todo.title} />
        </label>
      </p>
      <p>
        <label>
          <span>completed: </span>
          <input
            type="checkbox"
            defaultChecked={todo.completed}
            name="completed"
          />
        </label>
      </p>
      <p>
        <button type="submit">保存</button>
        <button type="button" onClick={() => navigate("/")}>
          取消
        </button>
      </p>
    </Form>
  )
}
