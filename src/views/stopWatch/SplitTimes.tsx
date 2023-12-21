import React from "react"
import MajorClock from "./MajorClock"

type TProps = React.PropsWithChildren<{
  value: number[]
}>
export default function SplitTimes(
  props: TProps = {
    value: [],
  }
) {
  const { value } = props
  return (
    <>
      {value.map((item, index) => {
        return <MajorClock key={index} milliseconds={item}></MajorClock>
      })}
    </>
  )
}
