import { redirect, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import App from "@/views/App.tsx"
import Login from "@/views/login/index.tsx"
import RequireAuth from "@/utils/requireAuth"


const Home = lazy(() => import('@/views/Home'))
const Counter = lazy(() => import('@/views/demo/counter'))
const TodoMvc = lazy(() => import('@/views/todoMvc'))
const EditTodo = lazy(() => import('@/views/todoMvc/EditTodo'))
const ArcoDemoPage = lazy(() => import('@/views/demo/viewArcoComp'))
const ErrorPage = lazy(() => import('@/views/ErrorPage'))
const StopWatch = lazy(() => import('@/views/stopWatch'))

import { updateTodo } from "@/store/todoSlice";
import { store } from '@/store/index'


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
          {
            path: 'viewArco',
            element: <ArcoDemoPage> 123 </ArcoDemoPage>,
          },
          {
            path: 'stopWatch',
            element: <StopWatch></StopWatch>,
          }
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
