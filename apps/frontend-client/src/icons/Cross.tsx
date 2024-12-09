import React from 'react'
import { RxCross2 } from 'react-icons/rx'
interface prop {
  props?: string
}

function Cross({ props }: prop) {
  return (
    <>
      <RxCross2 className={props} />
    </>
  )
}

export default Cross
