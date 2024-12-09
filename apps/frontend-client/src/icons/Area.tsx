import React from "react";
import Image from "next/image";
import area from "@/images/Area.svg";

interface Props {
  props?: string;
  className?: string; 
}




const Area: React.FC<Props> = ({ props }) => {
  return (
    <Image
      src={area}
      alt="bx_home"
      width={100}
      height={100}
      className={props}
    />
  );
};
export default Area;
