import React from "react";
// import { FaFacebookSquare } from "react-icons/fa";
import Image from "next/image";

import facebookLogo from "@/images/Facebook_Logo_Primary.png";

type prop = {
  props: string;
};
function Facebook({ props }: prop) {
  return (
    <>
      <Image
        className={props}
        src={facebookLogo}
        alt="facebook logo"
        width={35}
        height={35}
      />
      {/* <FaFacebookSquare className={props} /> */}
    </>
  );
}

export default Facebook;
