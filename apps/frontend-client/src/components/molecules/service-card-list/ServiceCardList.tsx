import React from "react";

import image1 from "@/images/Screenshot 2024-03-29 104508.png";
import image2 from "@/images/Screenshot 2024-03-29 104523.png";
import ServiceCard from "../service-card/ServiceCard";
export const rental = [
  {
    id: "1",
    name: "Phnom Penh",
    thumbnail: image1,
    rent: 30928,
    sell: 29400,
  },
  {
    id: "2",
    name: "Siem Reap",
    thumbnail: image2,
    rent: 30928,
    sell: 29400,
  },
];
function ServiceCardList() {
  return (
    <div className="flex flex-col gap-5 mb-10">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-[26px] font-[500]">Home Rental or Sale </h1>
      </div>
      <div className="grid  sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {rental.map((item, id) => (
          <ServiceCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ServiceCardList;
