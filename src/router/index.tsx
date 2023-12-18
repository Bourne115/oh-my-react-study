import { redirect, createBrowserRouter } from "react-router-dom";
// import type { LazyRouteFunction } from "react-router-dom";
// import { lazy } from "react";

import App from "@/views/App.tsx"
import Login from "@/views/login/index.tsx"
import Home from "@/views/Home";
import Counter from "@/views/demo/counter"
import TodoMvc from '@/views/todoMvc'

import EditTodo from "@/views/todoMvc/EditTodo.tsx"

import { updateTodo } from "@/store/todoSlice";
import { store } from '@/store/index'
import RequireAuth from "@/utils/requireAuth.tsx"
import ErrorPage from "@/views/ErrorPage.tsx";
// const lazyApp = lazy(() => import('../views/App'));

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


const baseRoutes = [
  {
    path: "/",
    element:  (
      <RequireAuth>
        <App></App>
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
        children: [
          {
            path: 'counter',
            element: <Counter></Counter>
          },
          {
            path: 'todo',
            element: <TodoMvc></TodoMvc>,
          },
          {
            path: "todo/:id",
            element: <EditTodo />,
          },
        ]
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  }
]

const router = createBrowserRouter(
  baseRoutes,
  {
    basename: "/",
  }
)

export default router
