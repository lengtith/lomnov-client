import React from "react";
import Image from "next/image";
import phone from "@/images/Phone.svg";

interface Props {
  props?: string;
}
const Phone: React.FC<Props> = ({ props }) => {
  return (
    <Image
      src={phone}
      alt="bx_home"
      width={100}
      height={100}
      className={props}
    />
  );
};
export default Phone;