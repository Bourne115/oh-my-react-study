import React, {} from 'react'
import { Button } from '@arco-design/web-react'

interface IBaseProps {
  activated: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onSplit: () => void
}

type TProps = React.PropsWithChildren<IBaseProps>


export default function ControlButtons(props: TProps) {
  const {
    activated,
    onStart,
    onPause,
    onReset,
    onSplit
  } = props
  return (
    <>
      <h3 className='bg-pink-100 text-20'>
        Contorl Buttons
      </h3>
      <div>
      {
        activated ?
        <Button
        onClick={onSplit} type='primary' size='large'>计次</Button> :
        <Button onClick={onReset} status='warning' size='large'>复位</Button>
      }
      {
        activated ?
        <Button onClick={onPause} status='danger' size='large'>停止</Button> :
        <Button onClick={onStart} status='success' size='large'>启动</Button>
      }
      </div>
    </>
  )
}
