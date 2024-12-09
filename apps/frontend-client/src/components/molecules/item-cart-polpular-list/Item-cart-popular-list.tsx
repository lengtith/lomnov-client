"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import PropertyCardWithModal from "../item-cart-popluar/Item-cart-popular";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import NotFound from "@/components/molecules/notFound/NotFound";
import axiosInstance from "@/libs/axios";
import { useSearchParams } from "next/navigation";
import { toggleCompare } from "@/libs/const/toggleCompare";
import ComparisonBar from "../comparison-bar/ComparisionBar";
import Loading from "@/components/atoms/loading/Loading";

async function fetchProperties(searchParams: { [key: string]: string | string[] | undefined }): Promise<{
  properties: RealEstateItem[];
  pagination: { totalPages: number; currentPage: number };
}> {
  const queryString = new URLSearchParams(searchParams as Record<string, string>).toString();
  const res = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}?${queryString}`);

  if (res.status !== 200) {
    throw new Error("Failed to fetch properties");
  }

  const data = await res.data;

  if (data && data.properties && Array.isArray(data.properties)) {
    return {
      properties: data.properties,
      pagination: data.pagination || { totalPages: 1, currentPage: 1 },
    };
  }

  console.error("Invalid response data", data);
  return { properties: [], pagination: { totalPages: 1, currentPage: 1 } };
}

function Component() {
  const searchParams = useSearchParams(); // Get query parameters from the URL
  const address = searchParams.get("address"); // Extract the address parameter from the URL
  const [datas, setDatas] = useState<RealEstateItem[]>([]);
  const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]);

  const fetchData = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      // @ts-ignore
      const result = await fetchProperties({ ...searchParams, page: String(page), address });
      setDatas(result.properties);
      setPagination(result.pagination);
    } catch (err: any) {
      console.error("Error fetching properties:", err);
      setError("Failed to load properties. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [searchParams, address]); // Add dependencies to useCallback

  // Fetch data on mount or when address query changes
  useEffect(() => {
    fetchData(1);
  }, [fetchData]); // Use fetchData in the dependency array

  const handlePageChange = (page: number) => {
    if (page !== pagination.currentPage) {
      fetchData(page);
    }
  };

  if (loading) {
    return <div className="w-[1300px] flex items-center justify-center">
      <Loading />
    </div>
  } else if (datas.length === 0) {
    return <NotFound />;
  } else if (error) {
    return <div>{error}</div>;
  }

  // Handle comparison toggling using the imported toggleCompare function
  const handleToggleCompare = (items: RealEstateItem[]) => {
    toggleCompare(items, selectedItems, setSelectedItems);
  };
  return (
    <main>
      {/* Banner */}
      <div className="w-[1300px] m-auto grid grid-cols-4 gap-5 mt-[100px] z-0">
        {datas.map((item) => {
          const isSelected = selectedItems.some((selectedItem) => selectedItem._id === item._id);
          return (
            <PropertyCardWithModal key={item._id} item={item} flexRow={false} toggleCompare={() => handleToggleCompare([item])} isSelected={isSelected} disabled={selectedItems.length >= 2 && !isSelected} />
          )
        })}
      </div>

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="pagination flex justify-center m-10 space-x-4">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded-full ${page === pagination.currentPage ? "bg-olive-drab text-white" : "bg-white text-olive-drab"}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* comparison bar */}
      <ComparisonBar selectedItems={selectedItems} toggleCompare={setSelectedItems} />
    </main>
  );
}

const ItemCardPopularList = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};

export default ItemCardPopularList;
