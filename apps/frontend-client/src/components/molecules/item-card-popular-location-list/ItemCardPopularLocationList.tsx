
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useProperties } from "@/context/property";

export const provinceImg = [
  {
    id: 1,
    name: "Phnom Penh",
    img: "https://www.businesstoday.com.my/wp-content/uploads/2021/12/Phnom_Penh_Evening_Aerial_View.png",
  },
  {
    id: 2,
    name: "Siem Reap",
    img: "https://th.bing.com/th/id/OIP.RMAAqAc67bO0QZ7boUAh0QHaE7?rs=1&pid=ImgDetMain",
  },
  {
    id: 3,
    name: "Preah Sihanouk",
    img: "https://lh3.googleusercontent.com/-BlUpYAYxx6s/TXSOHk1sJAI/AAAAAAAABEQ/TtCAVUhvL9A/w1200-h630-p-k-no-nu/o.jpg",
  },
  {
    id: 4,
    name: "Kep",
    img: "https://www.gocambodia.tours/wp-content/uploads/2019/06/KEP-Beach.jpg",
  },
];

const ItemCardPopularLocationList = () => {
  const { properties, loading, error, fetchProperties } = useProperties();
  const [currentPage, setCurrentPage] = useState(1);
  const [groupedData, setGroupedData] = useState<{
    address: string;
    forSale: number;
    forRent: number;
    img: string;
  }[]>([]);

  // Fetch properties with debounce to avoid multiple requests
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProperties({ page: currentPage, limit: 24 });
    }, 500);

    return () => clearTimeout(delayDebounce); // Cleanup timeout
  }, [currentPage, fetchProperties]);

  // Group and count properties by address, and match with province images
  useEffect(() => {
    if (!loading && properties) {
      const addressGroups = properties.reduce((acc, property) => {
        const address = property.address.find((a) => a.language === "en")?.content || "Unknown";
        const transitions = property.transition || [];

        if (!acc[address]) {
          acc[address] = { address, forSale: 0, forRent: 0, img: "" };
        }

        transitions.forEach((transition) => {
          if (transition.content === "For Sale") {
            acc[address].forSale += 1;
          } else if (transition.content === "For Rent") {
            acc[address].forRent += 1;
          }
        });

        return acc;
      }, {} as Record<string, { address: string; forSale: number; forRent: number; img: string }>);

      const sortedGroupedData = Object.values(addressGroups)
        .map((group) => {
          const province = provinceImg.find((p) => p.name === group.address);
          return {
            ...group,
            img: province ? province.img : "",
          };
        })
        .sort((a, b) => b.forSale + b.forRent - (a.forSale + a.forRent))
        .slice(0, 4);

      setGroupedData(sortedGroupedData);
    }
  }, [properties, loading]);

  return (
    <div className="flex flex-col gap-5 mb-10">
      <div className="flex flex-row justify-center items-center">
        <h1 className="text-[18px] lg:text-[26px] font-[600] text-center text-olive-drab">
          Popular Locations
        </h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {groupedData.map((group) => (
          <Link
            href={`/popular-location?address=${encodeURIComponent(group.address)}`} // Pass the address as query parameter
            key={group.address}
            className="w-full bg-white border border-neutral p-3 rounded-[15px] flex flex-col gap-3 h-[400px] overflow-hidden animate-fadeUp hover:shadow-lg hover:scale-105 transition duration-300 active:scale-95"
          >
            <div className="w-full h-[80%] rounded-[15px] overflow-hidden">
              <Image
                src={group.img || "https://via.placeholder.com/500"}
                alt={group.address}
                width={500}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="h-[20%] flex flex-col justify-center items-center">
              <p className="font-[700] text-[18px] underline text-olive-drab">{group.address}</p>
              <section className="flex flex-row gap-5 justify-center items-center w-full h-[60px]">
                <div className="font-[600]">
                  <span className="text-[14px]">{group.forRent}</span>
                  <span className="text-[14px]"> Rent</span>
                </div>
                <div className="font-[600]">
                  <span className="text-[14px]">{group.forSale}</span>
                  <span className="text-[14px]"> Sell</span>
                </div>
              </section>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ItemCardPopularLocationList;
