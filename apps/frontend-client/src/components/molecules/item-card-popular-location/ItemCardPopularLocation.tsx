import React from "react";
import Image from "next/image";
import Link from "next/link";
interface Item {
  id: string;
  name: string;
  thumbnail: string;
  rent: number;
  sell: number;
}

interface ItemCardProps {
  item: Item;
}
function ItemCardPopularLocation({ item }: ItemCardProps) {
  return (
    <Link href={`/popular-location`} className="w-full bg-white border border-neutral p-3 rounded-[15px] flex flex-col gap-3 h-[400px]  overflow-hidden animate-fadeUp hover:shadow-lg hover:scale-105 transition duration-300 active:scale-95 ">
      <div className=" w-full h-[80%] rounded-[15px] overflow-hidden">
        <Image
          src={item.thumbnail}
          alt=""
          width={"500"}
          height={"500"}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="h-[20%] flex flex-col justify-center items-center">
        <p className=" font-[700] text-[18px]  underline text-olive-drab">
          {item.name}
        </p>

        <section className="  flex  flex-row gap-5 justify-center items-center  w-full h-[60px]">
          <div className="font-[600]">
            <span className="text-[14px] "> {item.rent}</span>
            <span className=" text-[14px] "> Rent </span>
          </div>

          <div className=" font-[600] ">
            <span className="text-[14px] "> {item.sell}</span>
            <span className=" text-[14px] "> Sell </span>
          </div>
        </section>
      </div>
    </Link>
  );
}

export default ItemCardPopularLocation;
