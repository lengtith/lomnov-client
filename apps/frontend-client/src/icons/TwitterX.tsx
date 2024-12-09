import React from 'react'
import { FaXTwitter } from 'react-icons/fa6'
type prop = {
    props: string
}
function TwitterX({props}: prop) {
  return (
    <>
        <FaXTwitter className={props}/>
    </>
  )
}

export default TwitterX