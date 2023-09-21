import { useParams, useNavigate, Form } from 'react-router-dom';
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useSelector, useDispatch } from "react-redux"
import { selectTodoById, updateTodo } from "../../store/todoSlice"

import type { ITodoItem } from "../../utils/todoStorage"

const schema = yup.object({
  title: yup.string().required(),
  completed: yup.boolean(),
}).required()

type FormValues = yup.InferType<typeof schema>



export default function EditTodo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const todo = useSelector(
    (state: unknown): ITodoItem => selectTodoById(state, Number(id))
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<ITodoItem>({
    defaultValues: todo,
  })

  console.log("control", control)

  const newTitle = watch("title")
  if (newTitle !== todo.title) {
    console.log("newTitle", newTitle)
  }
  const dispatch = useDispatch()
  const onSubmit = (data: ITodoItem) => {
    console.log(data)

    dispatch(updateTodo({ ...data, id: Number(id) }))
    // fetch updates...
    navigate("/", { replace: true })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>
        <label>
          <span>name: </span>
          <input
            type="text"
            {...register("title", { required: true })}
            defaultValue={todo.title}
          />
        </label>
        {errors.title && <span>请输入标题</span>}
      </p>
      <p>
        {/* <input {...register("firstName", { required: true, maxLength: 20 })} />
        <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} /> */}
      </p>
      <p>
        <label>
          <span>completed: </span>
          <input
            type="checkbox"
            defaultChecked={todo.completed}
            {...register("completed")}
          />
        </label>
      </p>
      <p>
        <button type="submit">保存</button>
        <button type="button" onClick={() => navigate("/")}>
          取消
        </button>
      </p>
    </form>
  )
}
