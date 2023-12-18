import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useRedirect(path: string = '/home/counter') {
  const nav = useNavigate()
  useEffect(() => {
    nav(path)
  }, [nav, path])
}