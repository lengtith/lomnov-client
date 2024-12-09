'use client';

import React, { useEffect, useState } from "react";
import ItemCard from "../item-card/ItemCard";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import { useProperties } from "@/context/property"; // Updated context
import ArrowLeftCycle from "@/icons/Arrow";
import ArrowRightCycle from "@/icons/Arrowup";
import Loading from "@/components/atoms/loading/Loading";
import ComparisonBar from "../comparison-bar/ComparisionBar";
import { toggleCompare } from "@/libs/const/toggleCompare";

const RentPropertyList = () => {
  const { properties, loading, error, fetchProperties, pagination } = useProperties();
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<RealEstateItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]); // Manage selected items for comparison

  // Fetch properties with debounce to avoid multiple requests
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProperties({ page: currentPage, limit: 23 }); // Ensure the limit matches your backend setup
    }, 500); // Reduced debounce to make it more responsive

    return () => clearTimeout(delayDebounce); // Cleanup timeout
  }, [currentPage, fetchProperties]);

  // Update local items whenever properties from context are updated
  useEffect(() => {
    if (!loading && properties) {
      console.log("Fetched properties:", properties);
      console.log("Pagination details:", pagination);
      setItems(properties);
    }
  }, [properties, loading, pagination]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page); // Update the current page
    }
  };

  // Filter properties for "For Rent"
  const filterPropertyRent = items.filter((data) =>
    data.transition.some((t) => t.content === "For Rent")
  );

  // Handle comparison toggling using the imported toggleCompare function
  const handleToggleCompare = (items: RealEstateItem[]) => {
    console.log("item details:: ", items);
    
    toggleCompare(items, selectedItems, setSelectedItems);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {!loading && filterPropertyRent.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {filterPropertyRent.map((item) => {            
            const isSelected = selectedItems.some((selectedItem) => selectedItem._id === item._id);
            return (
              <ItemCard key={item._id} item={item} toggleCompare={()=> handleToggleCompare([item])} isSelected={isSelected} disabled={selectedItems.length >= 2 && !isSelected} />
            );
          })}
        </div>
      ) : (
        <div className="w-[1300px] flex items-center justify-center">
          <Loading />
        </div>
      )}

      {/* Render the ComparisonBar */}
      <ComparisonBar selectedItems={selectedItems} toggleCompare={setSelectedItems} />

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="pagination flex justify-center m-10 space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="disabled:opacity-50"
          >
            <ArrowLeftCycle className="size-8 font-weight: 300 text-olive-drab rotate-90" />
          </button>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded-full ${page === currentPage
                ? "bg-olive-drab text-white font-weight: 500"
                : "bg-white text-olive-drab"
                }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
            className="disabled:opacity-50"
          >
            <ArrowRightCycle className="size-8 text-olive-drab rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RentPropertyList;
