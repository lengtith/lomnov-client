import React from 'react'
import { BsTelephone } from "react-icons/bs";

type prop = {
    props: string;
  };
  
const TellPhone = ({ props }: prop) => {
  return (
    <BsTelephone className={props}/>
  )
}

export default TellPhone