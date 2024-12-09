import React from "react";
import { LuDollarSign } from "react-icons/lu";
type prop = {
  className?: string;
};
function Dollar({ className }: prop) {
  return (
    <>
      <LuDollarSign className={className} />
    </>
  );
}

export default Dollar;

