import React from "react";
import Image from "next/image";

interface Item {
  id: string;
  name: string;
  thumbnail: string;
  rent: number;
  sell: number;
}

interface ItemProps {
  item: Item;
}

function ServiceCard({ item }: any) {
  return (
    <div className="w-full h-[400px] shadow-md bg-white rounded-md flex flex-col gap-3 items-center justify-center p-5 px-5">
      <Image src={item.thumbnail} alt="" width={200} height={200} priority />
      <p className="text-center mb-5 text-[#808080b0] font-[500]">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, totam.
      </p>
      <div className="text-white bg-blue-500 px-24 py-2 rounded-md capitalize">
        {item.name}
      </div>
    </div>
  );
}

export default ServiceCard;
