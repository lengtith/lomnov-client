import React from 'react'
import { BsMap } from 'react-icons/bs'
type prop = {
    props: string
}
function Map({props}: prop) {
  return (
   <>
    <BsMap className={props}/>
   </>
  )
}

export default Map