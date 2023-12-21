
import { useCallback, useState } from 'react'
import MajorClock from "./MajorClock"
import ControlButtons from "./ControlButtons"
import SplitTimes from "./SplitTimes"
import { useImmer } from 'use-immer'

interface IInfo {
  startTime: number
  currentTime: number
  isStart: boolean
  splitTimes: number[]

}

export default function StopWatch() {
  const [info, setInfo] = useImmer<IInfo>({
    startTime: 0,
    currentTime: 0,
    isStart: false,
    splitTimes: [],
  })
  const [timer, setTimer] = useState<any>(null)


  const onStart = () => {
    setInfo((draft) => {
      draft.isStart = true
      draft.startTime = draft.startTime ? 
        draft.startTime + Date.now() - draft.currentTime : Date.now()
      draft.currentTime = Date.now()
    })

    const timer = setInterval(() => {
      setInfo((draft) => {
        draft.currentTime = Date.now()
      })
    }, 1000 / 60)
    setTimer(timer)
  }

  const onPause = () => {
    if(timer) clearInterval(timer)
    setInfo((draft) => {
      draft.isStart = false
    })
  }

  const onReset = () => {
    setInfo((draft) => {
      draft.startTime = 0
      draft.currentTime = 0
      draft.splitTimes = []
    })
  }

  const onSplit = useCallback(() => {
    setInfo((draft) => {
      const diff = draft.currentTime - draft.startTime
      if(diff) draft.splitTimes.push(diff)
      // draft.startTime = draft.currentTime
    })
  }, [setInfo])

  return (
    <>
      <h2 className='text-50'>Stop Watch</h2>
      <hr></hr>
      <MajorClock milliseconds={info.currentTime - info.startTime}></MajorClock>
      <ControlButtons 
        activated={info.isStart}
        onStart={onStart}
        onPause={onPause}
        onReset={onReset}
        onSplit={onSplit}
      >
      </ControlButtons>
      <SplitTimes value={info.splitTimes}></SplitTimes>
    </>
  )
}