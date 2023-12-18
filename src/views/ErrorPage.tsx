import { useNavigate, useRouteError } from "react-router-dom";
import { Button } from '@arco-design/web-react'

type TError = {
  data: any
}

export default function ErrorPage() {
  const nav = useNavigate()
  const error:TError = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>啊哦!</h1>
      <p>实在抱歉，页面显示发生了点意外情况，要不咱再试试？</p>
      <p>
        <i>{error.data}</i>
      </p>
      <Button onClick={() => nav('/')}>返回首页</Button>
    </div>
  );
}