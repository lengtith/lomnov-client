"use client";

import React, { useEffect, useState } from "react";
import ItemCard from "../item-card/ItemCard"; // Component to display property details
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import { useProperties } from "@/context/property"; // Updated context
import ArrowLeftCycle from "@/icons/Arrow";
import ArrowRightCycle from "@/icons/Arrowup";
import ComparisonBar from "@/components/molecules/comparison-bar/ComparisionBar"; // Import the ComparisonBar
import Loading from "@/components/atoms/loading/Loading";

// Define the props for the PropertyList component
interface PropertyListProps {
  toggleCompare: (item: RealEstateItem[]) => void;
  selectedProperties: RealEstateItem[];
}

const PropertyList: React.FC<PropertyListProps> = ({ toggleCompare, selectedProperties }) => {
  const { properties, loading, error, fetchProperties, pagination } = useProperties();
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<RealEstateItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([])

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProperties({ page: currentPage }); // Fetch data for the current page
    }, 1000); // 1000ms debounce

    return () => clearTimeout(delayDebounce); // Cleanup timeout
  }, [currentPage, fetchProperties]);

  useEffect(() => {
    if (!loading && properties) {
      setItems(properties);
    }
  }, [properties, loading]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page); // Update the current page
    }
  };

  // Handle comparison toggling using the imported toggleCompare function
  const handleToggleCompare = (items: RealEstateItem[]) => {
    toggleCompare(items);
  };

  return (
    <div>
      {loading && <p>Loading properties...</p>}
      {error && <p>{error}</p>}
      {!loading && items.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {items.map((item) => {

            const isSelected = selectedItems.some((selectedItem)=> selectedItem._id === item._id)
            return (
              <ItemCard
                key={item._id}
                item={item}
                toggleCompare={()=> handleToggleCompare([item])} 
                isSelected={isSelected}
                disabled={selectedItems.length >= 2 && !isSelected}
              />
            )
          }
          )}
        </div>
      ) : (
        <div className="w-[1300px] flex items-center justify-center">
          <Loading />
        </div>)}

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="pagination flex justify-center m-10 space-x-4">
          {/* Previous Page Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="disabled:opacity-50"
          >
            <ArrowLeftCycle className="text-olive-drab rotate-90 text-xl" />
          </button>

          {/* Page Buttons */}
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded-full ${
                page === currentPage ? "bg-olive-drab text-white font-semibold" : "bg-white text-olive-drab"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Page Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
            className="disabled:opacity-50"
          >
            <ArrowRightCycle className="text-olive-drab rotate-180 text-xl" />
          </button>
        </div>
      )}

      {/* Render the ComparisonBar */}
      <ComparisonBar selectedItems={selectedProperties} toggleCompare={setSelectedItems} />
    </div>
  );
};

export default PropertyList;
