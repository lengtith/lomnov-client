'use client';

import React, { useEffect, useState, useCallback } from "react";

import PropertyActions from "@/components/molecules/properties-action/PropertyActions";
import { useProperties } from "@/context/property";
import { useAuth } from "@/context/user";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import Loading from "@/components/atoms/loading/Loading";
import ItemCardPost from "@/components/molecules/item-cart-post-property/ItemCartPost";
import { toggleCompare } from "@/libs/const/toggleCompare";
import ComparisonBar from "@/components/molecules/comparison-bar/ComparisionBar";

const ListedProperties = () => {
  const { user, isAuthenticated } = useAuth(); // Access user and auth status from context
  const { properties, error, fetchProperties: contextFetchProperties } = useProperties();
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [items, setItems] = useState<RealEstateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]);

  // Filter properties based on the authenticated user
  const listedProperties = user && properties
    ? properties.filter((property: RealEstateItem) => property._id === user._id) // Assuming 'ownerId' links property to user
    : [];

  // Define fetchProperties as a callback function to avoid missing dependencies in useEffect
  const fetchProperties = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`${API_ENDPOINTS.MY_PROPERTY}`);
      if (res.status !== 200) {
        throw new Error("Failed to fetch properties");
      }
      const properties = res.data.properties;
      setItems(properties);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      fetchProperties();
    }
  }, [isAuthenticated, user?._id, fetchProperties]); // Include fetchProperties in dependencies

  // Handle comparison toggling using the imported toggleCompare function
  const handleToggleCompare = (items: RealEstateItem[]) => {
    toggleCompare(items, selectedItems, setSelectedItems);
  };


  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-[1300px] mx-auto">
     

      <div className="grid mt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5">
        {loading ? (
          <div className="w-[1300px] flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          items.map((item) => {
            const isSelected = selectedItems.some((selectedItem) => selectedItem._id === item._id);
            return (
              <ItemCardPost key={item._id} item={item} toggleCompare={() => handleToggleCompare([item])} isSelected={isSelected} disabled={selectedItems.length >= 2 && !isSelected} />
            )
          })
        )}
      </div>
      {/* Comparison Bar */}
      <ComparisonBar selectedItems={selectedItems} toggleCompare={setSelectedItems} />
    </div>
  );
};

export default ListedProperties;