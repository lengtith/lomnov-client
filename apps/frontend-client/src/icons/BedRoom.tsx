import React from "react";
import { IoBedOutline } from "react-icons/io5";

interface IconProps {
  className?: string;  // Change props to className
}

function BedRoom({ className }: IconProps) {
  return <IoBedOutline className={className} />;  // Pass className to IoBedOutline
}

export default BedRoom;
