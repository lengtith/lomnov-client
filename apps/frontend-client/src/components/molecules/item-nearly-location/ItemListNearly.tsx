'use client';
import React, { useEffect, useState } from "react";
import ItemCard from "../item-card/ItemCard"; // Component to display property details
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import { useProperties } from "@/context/property"; // Updated context
import ArrowLeftCycle from "@/icons/Arrow";
import ArrowRightCycle from "@/icons/Arrowup";
import ComparisonBar from "../comparison-bar/ComparisionBar";
import { toggleCompare } from "@/libs/const/toggleCompare";
import Loading from "@/components/atoms/loading/Loading";

const ItemCartNearlyList = () => {
  const { nearbyProperties, properties, loading, error, fetchNearbyProperties } = useProperties();
  const [items, setItems] = useState<RealEstateItem[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Set items per page

  // Function to calculate the distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Distance in meters
    return distance;
  };

  // Function to fetch nearby properties based on user location
  const fetchNearby = async (latitude: number, longitude: number) => {
    try {
      await fetchNearbyProperties({ lat: latitude, lng: longitude, maxDistance: 100000 });
    } catch (err) {
      console.error("Error fetching nearby properties:", err);
      setLocationError("Failed to fetch nearby properties. Please try again.");
    }
  };

  // Function to sort properties by proximity to the user
  const sortPropertiesByDistance = (latitude: number, longitude: number, allProperties: RealEstateItem[]) => {
    const sorted = allProperties.sort((a, b) => {
      const coordsA = a.coordinate?.coordinates || [0, 0];
      const coordsB = b.coordinate?.coordinates || [0, 0];

      // Validate coordinates before calculating distance
      if (coordsA.length !== 2 || coordsB.length !== 2) {
        console.error("Invalid coordinates in property:", a, b);
        return 0; // Skip invalid coordinates
      }

      const distanceA = calculateDistance(latitude, longitude, coordsA[1], coordsA[0]);
      const distanceB = calculateDistance(latitude, longitude, coordsB[1], coordsB[0]);

      return distanceA - distanceB; // Sort by distance: nearest first
    });

    return sorted;
  };

  // Paginate properties based on the current page and items per page
  const paginateProperties = (allProperties: RealEstateItem[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allProperties.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Log the coordinates for debugging
            console.log('User Location:', { latitude, longitude });

            // Fetch nearby properties based on user location
            await fetchNearby(latitude, longitude);

            // After fetching, combine properties and sort them by distance
            const allProperties = [
              ...(nearbyProperties || []),
              ...(properties || [])
            ];

            // Log combined properties for debugging
            console.log('All Properties:', allProperties);

            // Sort the combined properties based on distance
            const sortedProperties = sortPropertiesByDistance(latitude, longitude, allProperties);

            // Log sorted properties for debugging
            console.log('Sorted Properties:', sortedProperties);


            // Paginate the sorted properties
            const paginatedProperties = paginateProperties(sortedProperties);

            setItems(paginatedProperties); // Update state with paginated items
          },
          (error) => {
            console.error("Geolocation error:", error);
            setLocationError("Location access denied. Enable location to find nearby properties.");
          }
        );
      } else {
        setLocationError("Geolocation is not supported by your browser.");
      }
    };

    getUserLocation(); // Call the function to get the user's location
  }, [currentPage, nearbyProperties, properties]); // Run when the current page changes

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Math.ceil((nearbyProperties?.length || 0 + properties?.length || 0) / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  // Handle comparison toggling using the imported toggleCompare function
  const handleToggleCompare = (items: RealEstateItem[]) => {
    toggleCompare(items, selectedItems, setSelectedItems);
  };
  return (
    <div>
      {loading && <p>Loading properties...</p>}
      {error && <p>{error}</p>}
      {locationError && <p>{locationError}</p>}

      {!loading && items.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {items.map((item) => {
            const isSelected = selectedItems.some((selectedItem) => selectedItem._id === item._id);
            return (
              <ItemCard
                key={item._id}
                item={item}
                toggleCompare={() => handleToggleCompare([item])}
                isSelected={isSelected}
                disabled={selectedItems.length >= 2 && !isSelected}
              />
            );
          })}
        </div>
      ) : (
        !loading && (
          <div className="w-[1300px] flex items-center justify-center">
            <Loading />
          </div>
        )
      )}

      {/* Pagination Controls */}
      {items.length > 0 && (
        <div className="pagination flex justify-center m-10 space-x-4">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="disabled:opacity-50 "
          >
            <ArrowLeftCycle className="size-8   font-weight: 300 text-olive-drab rotate-90" />
          </button>

          {/* Page Number Buttons */}
          {Array.from({ length: Math.ceil((nearbyProperties?.length || 0 + properties?.length || 0) / itemsPerPage) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded-full ${page === currentPage ? "bg-olive-drab text-white" : "bg-white text-olive-drab"}`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil((nearbyProperties?.length || 0 + properties?.length || 0) / itemsPerPage)}
            className="disabled:opacity-50 "
          >
            <ArrowRightCycle className="size-8   text-olive-drab rotate-180" />
          </button>
        </div>
      )}

      {/* comparison bar */}
      <ComparisonBar selectedItems={selectedItems} toggleCompare={setSelectedItems} />
    </div>
  );
};

export default ItemCartNearlyList;
