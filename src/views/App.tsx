import { Suspense } from "react"
import { Spin } from '@arco-design/web-react'
import { IconLoading } from '@arco-design/web-react/icon'
import { Outlet } from "react-router-dom"
import useRedirect from '@/hooks/useRedirect'
import './App.scss'

function App() {
  useRedirect('/home/counter')
  return (
    <div className="App">
      <Suspense fallback={ <Spin loading={true} size={30} icon={<IconLoading />}/> }>
        { <Outlet></Outlet> }
      </Suspense>
    </div>
  )
}

export default App
