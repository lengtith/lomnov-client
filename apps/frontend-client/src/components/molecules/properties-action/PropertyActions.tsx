"use client";
import Link from "next/link";
import React from "react";

interface PropertyActionsProps {
  onPost?: () => void;
}

const PropertyActions: React.FC<PropertyActionsProps> = ({onPost}) => {
  return (
    <div className="flex justify-end space-x-[10px] items-center font-helvetica text-helvetica-paragraph text-charcoal font-bold">
      <Link
        className="w-[200px] h-[38px] text-[16px] rounded-[5px] bg-olive-green text-white px-[10px] py-[8px] flex justify-center items-center text-center  "
        href={"/post-property"}
        //onClick={onPost}
      >
        + New Property
      </Link>
     
    </div>
  );
};

export default PropertyActions;
