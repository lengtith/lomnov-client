import React from "react";
import compareicon from "@/images/iconamoon_compare.svg";
import Image from "next/image";

// Update the prop type to accept `onClick`
interface Prop {
  className?: string;
  onClick?: () => void; // Add the `onClick` prop to handle click events
}

function Compare({ className, onClick }: Prop) {
  return (
    <div onClick={onClick}> {/* Wrap the Image component with a div to handle the click event */}
      <Image
        src={compareicon}
        alt="Compare icon"
        width={18}
        height={23}
        className={className}
      />
    </div>
  );
}

export default Compare;
