import React from "react";
import Image from "next/image";
import ArrowUpVector from "@/images/ArrowUp-Vector.svg";

interface Props {
  props?: string;
}

const ArrowDown: React.FC<Props> = ({ props }) => {
  return (
    <Image
      src={ArrowUpVector}
      alt="arrowdown"
      width={100}
      height={100}
      className={props}
    />
  );
};

export default ArrowDown;
