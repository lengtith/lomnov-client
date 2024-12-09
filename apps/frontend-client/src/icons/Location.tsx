import React from 'react'
import { SlLocationPin } from "react-icons/sl";

interface prop {
  className?: string;  // Change props to className
}
function Location({className}: prop) {
  return (
    <>  <SlLocationPin className={className} /></>
  )
}

export default Location
