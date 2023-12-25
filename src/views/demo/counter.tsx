import { useBearStore } from '@/zustand'
import  React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { Button, Input } from '@arco-design/web-react';

type TProps = React.PropsWithChildren<any>
const RawInput = forwardRef((props: TProps, ref: any) => {
  useImperativeHandle(ref, () => {
    return {
      arcoInput: ref.current,
      qileCb: () => {}
    }
  }, [ref])
  return <Input ref={ref} {...props} />
})

export default function Counter() {
  const { count, increment, decrement } = useBearStore()
  const inputRef:any = useRef(null)
  const handleClick = () => {
    // inputRef.current.focus()
    console.log('inputRef', inputRef.current)
  }
  return (
    <div>
      <RawInput 
        ref={inputRef}
        type="text"
        placeholder="请输入"
        defaultValue={count}
      >
      </RawInput>
      <Button onClick={handleClick} type='primary'>聚焦</Button>
      <br/>
      <Button onClick={decrement} shape='circle' status='success'>-</Button>
      <span style={{display: 'line-block', margin: '0 12px'}}>{count}</span>
      <Button onClick={increment} shape='circle' status='danger'>+</Button>
    </div>
  )
}