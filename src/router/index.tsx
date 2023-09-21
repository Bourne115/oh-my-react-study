import { redirect, createBrowserRouter } from "react-router-dom";

import App from "../views/App.tsx"
import Login from "../views/login/index.tsx"
import EditTodo from "../views/todoMvc/EditTodo.tsx"

import { updateTodo } from "../store/todoSlice";
import { store } from '../store/index'
import RequireAuth from "../utils/requireAuth.tsx"
import ErrorPage from "../views/ErrorPage.tsx";

export async function editTodoAction(data: any) {
  // 获取表单数据
  const formData = await data.request.formData();
  const updates = Object.fromEntries(formData);
  // 类型转换
  updates.id = +data.params.id
  updates.completed = !!updates.completed
  // 修改数据
  store.dispatch(updateTodo(updates))
  // 实际场景中是请求接口
  // await updateTodo(params.id, updates);
  // 操作成功重定向
  return redirect(`/`);
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element:  (
        <RequireAuth><App /></RequireAuth>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/edit/:id",
      element: <EditTodo />,
      // action:  editTodoAction,
    },
  ],
)

export default router
