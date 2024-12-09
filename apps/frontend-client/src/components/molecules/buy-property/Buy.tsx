'use client';

import React, { useEffect, useState } from "react";
import ItemCard from "../item-card/ItemCard";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import { useProperties } from "@/context/property";
import ArrowLeftCycle from "@/icons/Arrow";
import ArrowRightCycle from "@/icons/Arrowup";
import Loading from "@/components/atoms/loading/Loading";
import ComparisonBar from "@/components/molecules/comparison-bar/ComparisionBar"; 
import { toggleCompare } from "@/libs/const/toggleCompare";

const BuyProperty = () => {
  const { properties, loading, error, fetchProperties, pagination } = useProperties();
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<RealEstateItem[]>([]);

  // Comparison state
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProperties({ page: currentPage, limit: 24 });
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [currentPage, fetchProperties]);

  useEffect(() => {
    if (!loading && properties) {
      setItems(properties);
    }
  }, [properties, loading]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const filterPropertyBuy = items.filter((data) =>
    data.transition.some((t) => t.content === "For Sale")
  );

  // Handle comparison toggling using the imported toggleCompare function
  const handleToggleCompare = (items: RealEstateItem[]) => {
    toggleCompare(items, selectedItems, setSelectedItems);
  };

  return (
    <div>
      {/* Comparison Bar at the top */}
      <ComparisonBar selectedItems={selectedItems} toggleCompare={setSelectedItems} /> {/* Show comparison bar */}

      {error && <p>{error}</p>}
      {!loading && filterPropertyBuy.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {filterPropertyBuy.map((item) => {
            const isSelected = selectedItems.some((selectedItem) => selectedItem._id === item._id);
            return (
              <ItemCard key={item._id} item={item} toggleCompare={() => handleToggleCompare([item])} isSelected={isSelected} disabled={selectedItems.length >= 2 && !isSelected} />
            );
          })}
        </div>
      ) : (
        <div className="w-[1300px] flex items-center justify-center">
          <Loading />
        </div>
      )}

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
              className={`px-3 py-1 border rounded-full ${page === currentPage ? "bg-olive-drab text-white font-weight: 500" : "bg-white text-olive-drab"}`}
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

export default BuyProperty;
