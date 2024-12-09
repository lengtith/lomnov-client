'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState, useCallback } from "react";
import axiosInstance from "@/libs/axios";
import { RealEstateItem } from "@/libs/types/api-properties/property-response"; 
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalProperty: number;
}

interface PropertyContextType {
  properties: RealEstateItem[]; 
  nearbyProperties: RealEstateItem[]; 
  loading: boolean;
  error: string | null;
  pagination: PaginationData | null;
  fetchProperties: (params?: { page?: number; limit?: number }) => Promise<void>;
  fetchNearbyProperties: (params: { lat: number; lng: number; maxDistance?: number; limit?: number }) => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<RealEstateItem[]>([]); // Default to empty array
  const [nearbyProperties, setNearbyProperties] = useState<RealEstateItem[]>([]); // Default to empty array
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch properties with pagination
  const fetchProperties = useCallback(
    async (params: { page?: number; limit?: number; address?: string } = { page: 1, limit: 12 }) => {
      setLoading(true);
      setError(null);
      try {
        const queryString = new URLSearchParams(params as Record<string, string>).toString();
        const response = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}?${queryString}`);
        console.log("API Response:", response.data);
        setProperties(response.data.properties);
        setPagination(response.data.pagination);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetch nearby properties based on location
  const fetchNearbyProperties = useCallback(
    async ({ lat, lng, maxDistance = 10000, limit = 10 }: { lat: number; lng: number; maxDistance?: number; limit?: number }) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          `${API_ENDPOINTS.NEARLY}?lat=${lat}&lng=${lng}&maxDistance=${maxDistance}&limit=${limit}`
        );
        setNearbyProperties(response.data.properties || []); // Assuming response.data contains properties
      } catch (err) {
        console.error("Error fetching nearby properties:", err);
        setError("Failed to load nearby properties.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <PropertyContext.Provider
      value={{
        properties,
        nearbyProperties,
        loading,
        error,
        pagination,
        fetchProperties,
        fetchNearbyProperties,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperties must be used within a PropertyProvider");
  }
  return context;
};
