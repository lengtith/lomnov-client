import React from "react";
import Image from "next/image";
import kitchen from "@/images/fa6-solid_kitchen-set.svg";

interface Props {
  props?: string;
}

const Kitchen: React.FC<Props> = ({ props }) => {
  return (
    <Image
      src={kitchen}
      alt="bathroom"
      width={100}
      height={100}
      className={props}
    />
  );
};

export default Kitchen;
