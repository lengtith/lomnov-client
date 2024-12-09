"use client";
import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image"; // Import StaticImageData type

export interface ItemDevs {
  id: number;
  name: string;
  img: string | StaticImageData; // Allow both string and StaticImageData
  description: string;
}

const CartDev = ({ item }: { item: ItemDevs }) => {
  return (
    <div className="w-[283px] h-[320px] border-2 border-olive-gray/50 p-[20px] rounded-[10px]">
      <div className="flex flex-col items-center">
        <Image src={item.img} alt={item.name} className="w-[243px] h-[220px] rounded-[8px]"/>
        <p className="text-olive-gray text-[20px] mt-4">{item.name}</p>
        <p className="text-olive-gray text-[12px]">{item.description}</p>
      </div>
    </div>
  );
};

export default CartDev;
