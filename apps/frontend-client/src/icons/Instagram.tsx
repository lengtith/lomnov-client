import React from 'react'
import { FaInstagramSquare } from 'react-icons/fa'

type prop = {
    props: string
}
function Instagram({props}: prop) {
  return (
   <>
    <FaInstagramSquare className={props}/>
   </>
  )
}

export default Instagram