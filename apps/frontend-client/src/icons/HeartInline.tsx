import React from "react";

import { FaHeart } from "react-icons/fa";
type prop = {
  className?: string; 
};
const HeartInline = ({ className }: prop) => {
  return (
    <>
      <FaHeart className={className} />
    </>
  );
};

export default HeartInline;
