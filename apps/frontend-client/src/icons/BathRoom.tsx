import React from "react";
import { LuBath } from "react-icons/lu";
interface prop {
  className?: string;  // Change props to className
}
function BathRoom({ className }: prop) {
  return (
    <>
      <LuBath className={className} />
    </>
  );
}

export default BathRoom;
