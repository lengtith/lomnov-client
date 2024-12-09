import React from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
type prop = {
  className?: string;
};
const HeartOutline = ({ className }: prop) => {
  return (
    <>
      <FaRegHeart className={className} />
    </>
  );
};

export default HeartOutline;
