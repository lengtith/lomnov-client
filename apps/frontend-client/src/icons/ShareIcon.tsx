import React from "react";
import { IoMdShare } from "react-icons/io";
import Image from "next/image";
import vectorShare from "@/images/Vector-Share.svg";

interface prop {
  props?: string;
}
function ShareIcon({ props }: prop) {
  return (
    <>
      <Image
        src={vectorShare}
        alt="vector share"
        width={100}
        height={100}
        className={props}
      />
    </>
  );
}

export default ShareIcon;
