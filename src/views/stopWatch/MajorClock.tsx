import React from "react"
// import dayjs from "dayjs"
import padStart from 'lodash/padStart';

const ms2Time = (milliseconds:number) => {
  const ms = milliseconds % 1000
  const seconds = Math.floor(milliseconds / 1000) % 60
  const minutes = Math.floor(milliseconds / 1000 / 60) % 60
  const hours = Math.floor(milliseconds / 1000 / 60 / 60)

  return `${padStart(hours.toString(), 2, '0')}:${padStart(minutes.toString(), 2, '0')}:${padStart(seconds.toString(), 2, '0')}.${padStart(ms.toString(), 3, '0')}`
}

type TProps = React.PropsWithChildren<{
  milliseconds: number
}>

export default function MajorClock(
  prop: TProps = {
    milliseconds: 0,
  }
) {
  const { milliseconds } = prop

  return (
    <>
      <h3 className="text-50">{ms2Time(milliseconds)}</h3>
    </>
  )
}
