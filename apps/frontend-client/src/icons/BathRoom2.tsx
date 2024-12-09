import React from "react";
import Image from "next/image";
import bathroom from "@/images/marketeq_bathroom-2.svg";

interface Props {
  props?: string;
}

const BathRoom2: React.FC<Props> = ({ props }) => {
  return (
    <Image
      src={bathroom}
      alt="bathroom"
      width={100}
      height={100}
      className={props}
    />
  );
};

export default BathRoom2;
