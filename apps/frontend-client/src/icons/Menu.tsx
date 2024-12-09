import React from 'react'
import { FiMenu } from 'react-icons/fi'
interface prop {
  props?: string
}
function Menu({props}: prop) {
  return (
   <>
   <FiMenu className={props} />
   </>
  )
}

export default Menu
