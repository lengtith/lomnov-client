import React from "react";
import data from "@/app/(pages)/data-developer/DataDev";
import CartDev from "../cart-dev/CartDev";

const CartDevList = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mb-[80px]">
      {data.map((item) => (
        <CartDev key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartDevList;
