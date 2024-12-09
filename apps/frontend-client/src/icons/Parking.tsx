import React from "react";
import Image from "next/image";
import parking from "@/images/fa6-solid_car.svg";

interface Props {
  props?: string;
}
const Parking: React.FC<Props> = ({ props }) => {
  return (
    <Image
      src={parking}
      alt="bx_home"
      width={100}
      height={100}
      className={props}
    />
  );
};
export default Parking;
