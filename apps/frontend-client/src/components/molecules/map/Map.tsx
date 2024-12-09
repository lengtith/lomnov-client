"use client";
import React from "react";

interface prop {
  property: string;
}

const Map = ({ property }: prop) => {
  // Log the map URL to check if it's correct
  // console.log("Map URL:", property);

  return (
    <div className="max-w-[1300px] h-[400px] mx-auto mt-[50px] px-[10px]">
      <div className="w-full h-full">
        <iframe
          src={property}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
