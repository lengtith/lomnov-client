import React from "react";
import Image from "next/image";
import email from "@/images/Email.svg";

interface Props {
  props?: string;
}
const Email: React.FC<Props> = ({ props }) => {
  return (
    <Image
      src={email}
      alt="bx_home"
      width={100}
      height={100}
      className={props}
    />
  );
};
export default Email;