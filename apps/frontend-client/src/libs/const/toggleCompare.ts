// libs/const/toggleCompare.ts
import { RealEstateItem } from "@/libs/types/api-properties/property-response";

export const toggleCompare = (
  items: RealEstateItem[],
  selectedItems: RealEstateItem[],
  setSelectedItems: React.Dispatch<React.SetStateAction<RealEstateItem[]>>
) => {
  setSelectedItems((prevSelectedItems) => {
    const updatedState = [...prevSelectedItems];

    items.forEach((item) => {
      const isSelected = updatedState.some(
        (selectedItem) => selectedItem._id === item._id
      );

      if (isSelected) {
        // Remove the item from the selectedItems list if it's already selected
        const index = updatedState.findIndex(
          (selectedItem) => selectedItem._id === item._id
        );
        if (index !== -1) updatedState.splice(index, 1);
      } else {
        // Add the item to the selectedItems list if there's space (up to 2 items)
        if (updatedState.length < 2) {
          updatedState.push(item);
        }
      }
    });

    return updatedState;
  });
};
