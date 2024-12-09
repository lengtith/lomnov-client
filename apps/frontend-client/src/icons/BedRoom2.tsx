import React from "react";
import Image from "next/image";
import bathroom from "@/images/fluent_bed-16-filled (1).svg";

interface Props {
  props?: string;
}

const BedRoom2: React.FC<Props> = ({ props }) => {
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

export default BedRoom2;
