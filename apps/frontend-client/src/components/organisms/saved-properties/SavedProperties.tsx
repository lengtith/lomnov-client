"use client";

import React, { useEffect, useState } from "react";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "@/components/molecules/item-card/ItemCard";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import ComparisonBar from "@/components/molecules/comparison-bar/ComparisionBar"; 
import { toggleCompare } from "@/libs/const/toggleCompare";

import Loading from "@/components/atoms/loading/Loading";
const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState<RealEstateItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]); // Comparison state

  useEffect(() => {
    // Fetch saved properties for the user
    async function fetchSavedPropertiesID() {
      try {
        const responses = await axiosInstance.get(`${API_ENDPOINTS.GET_USER_SAVE_PROPERTY_ID}`);
        if (responses.status === 200) {
          const result: string[] = responses.data.favoritesId;
          // filter undefined value
          const filterValue: string[] = result.filter(item => item !== undefined);
          const finalResult: string = filterValue.filter(fil => fil !== null).join();

          return finalResult;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    async function fetchFavouriteProperties() {
      try {
        const favoritesId = await fetchSavedPropertiesID();
        if (favoritesId) {
          const favItemReponses = await axiosInstance.get(`${API_ENDPOINTS.MY_PROPERTY}?fav_me=${favoritesId}`);
          if (favItemReponses.status === 200) {
            setSavedProperties(favItemReponses.data.favoritesMe);
          }
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    }

    fetchFavouriteProperties();
  }, []);

  if (loading) return <p className="text-center">Loading properties...</p>;

 // Handle comparison toggling using the imported toggleCompare function
 const handleToggleCompare = (items: RealEstateItem[]) => {
  toggleCompare(items, selectedItems, setSelectedItems);
};

  return (
    <div className="max-w-[1300px] mx-auto">
      {/* Comparison Bar at the top */}
      <ComparisonBar selectedItems={selectedItems} toggleCompare={setSelectedItems} /> {/* Show comparison bar */}

      <div className="grid mt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5">
        {loading ? (<div className="w-[1300px] flex items-center justify-center">
          <Loading />
        </div>) : savedProperties.length > 0 ? (
          savedProperties.map((property) => {
            const isSelected = selectedItems.some((selectedItem) => selectedItem._id === property._id);
            return (

              <ItemCard
                favourited={true}
                key={property._id}
                item={property}
                toggleCompare={() => handleToggleCompare([property])}
                isSelected={selectedItems.some((selectedItem) => selectedItem._id === property._id)}
                disabled={selectedItems.length >= 2 && !isSelected}
              />
            )

          }
          )
        ) : (
          <p>No saved properties found.</p>
        )}
      </div>
    </div>
  );
};

export default SavedProperties;