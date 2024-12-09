"use client";

import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "@/components/molecules/item-card/ItemCard";
import { toggleCompare } from "@/libs/const/toggleCompare";
import ComparisonBar from "@/components/molecules/comparison-bar/ComparisionBar";
import VisitProfileSearch from "@/components/molecules/visit-profile-search/VisitProfileSearch";
import { useState } from "react";

const UserPostedProperties = ({ items = [] }: { items: RealEstateItem[] }) => {
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([])

// Handle comparison toggling using the imported toggleCompare function
const handleToggleCompare = (items: RealEstateItem[]) => {
  toggleCompare(items, selectedItems, setSelectedItems);
};  

  return (
    <section>

      <VisitProfileSearch/>
      <article className="grid mt-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5">
        {items.length > 0 ? (
          items.map((item) => {
            const isSelected = selectedItems.some((seletedItem) => seletedItem._id === item._id);
            return (
              <ItemCard key={item._id} item={item} toggleCompare={() => handleToggleCompare([item])} isSelected={isSelected} disabled={setSelectedItems.length >= 2 && !isSelected} />
            )
          }
          )
        ) : (
          <p>No item found.</p>
        )}
        <ComparisonBar selectedItems={selectedItems} toggleCompare={setSelectedItems} />
      </article>
    </section>
  );
}

export default UserPostedProperties;