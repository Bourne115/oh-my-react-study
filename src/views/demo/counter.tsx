import { useBearStore } from '@/zustand'

export default function Counter() {
  const { count, increment, decrement } = useBearStore()
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  )
}