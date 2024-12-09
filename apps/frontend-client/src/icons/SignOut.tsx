import React from "react";
import { IoLogOutSharp } from "react-icons/io5";

type prop = {
  props?: string;
};

function SignOut({ props }: prop) {
  return (
    <>
      <IoLogOutSharp className={props}/>
    </>
  );
}

export default SignOut;
