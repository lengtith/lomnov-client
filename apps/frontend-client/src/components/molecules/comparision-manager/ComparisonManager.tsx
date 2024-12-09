'use client';

import { useState } from "react";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ComparisonBar from "@/components/molecules/comparison-bar/ComparisionBar";


const ComparisonManager = () => {
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]);

  const toggleCompare = (item: RealEstateItem[]) => {
    setSelectedItems((prevState) => {
      const updatedState = [...prevState];
      item.forEach((newItem) => {
        const isSelected = updatedState.some((selectedItem) => selectedItem._id === newItem._id);
        if (isSelected) {
          updatedState.splice(updatedState.findIndex((selectedItem) => selectedItem._id === newItem._id), 1); // Remove if already selected
        } else {
          updatedState.push(newItem); // Add if not selected
        }
      });
      return updatedState;
    });
  };

  return (
    <>      <ComparisonBar selectedItems={selectedItems} toggleCompare={toggleCompare} />
    </>
  );
};

export default ComparisonManager;
