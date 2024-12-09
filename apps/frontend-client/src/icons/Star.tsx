import React from 'react'
import { GoStar } from 'react-icons/go'
type prop = {
    props: string
}
function Star({ props} : prop) {
  return (
   <>
        <GoStar className={props}/>
   </>
  )
}

export default Star