import React from "react";
// import { FaGoogle } from "react-icons/fa";
import Image from "next/image";

// const imgGoogle = "/app/frontend-client/src/images/google icon.png";
import  imgGoogle  from "@/images/google_icon.png"

type prop = {
  props: string;
};
function Google({ props }: prop) {
  return (
    <>
      <Image
        src={imgGoogle}
        alt="google icon"
        width={35}
        height={35}
        className={props}
      />

      {/* <FaGoogle className={props} /> */}
    </>
  );
}

export default Google;
