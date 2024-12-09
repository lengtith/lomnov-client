import React from "react";
import Image from "next/image";

interface BannerProps {
  background?: string;
}

const Banner: React.FC<BannerProps> = ({ background }) => {
  return (
    <div className="w-full mx-auto">
      <header className="relative w-full h-[400px]">
        <Image
          src={background || '/images/default-banner.jpg'} 
          alt="banner"
          fill
          style={{ objectFit: "cover" }}
          className="brightness-75 overflow-hidden"
          priority // Loads the banner image quickly
        />
      </header>
    </div>
  );
};

export default Banner;