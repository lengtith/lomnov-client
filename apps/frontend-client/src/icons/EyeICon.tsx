import React from "react";
import { BsEye } from "react-icons/bs";
type prop = {
  className?: string;
};
function Eye({ className }: prop) {
  return (
    <>
      <BsEye className={className} />
    </>
  );
}

export default Eye;

