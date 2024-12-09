import React from "react";
import iconSVg from "@/images/icon-svg.png"
import Image from "next/image";
import _404 from "@/images/404.png"
const NotFound = () => {
  return (
    <main className="w-full">
      <Image src={iconSVg} alt="" className="w-[1200px] m-auto" />
      <Image src={_404} alt="" className="w-[500px] m-auto -mt-32" />
      <h1 className="font-helvetica text-helvetica-h3 font-bold text-olive-green flex items-center justify-center mb-10">Property Not Found!</h1>
    </main>
  );
}

export default NotFound;
