import { RealEstateItem } from '@/libs/types/api-properties/property-response';
import { IMenus } from '@/libs/types/api-menus/menu-response';
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";

export async function fetchMenus(): Promise<IMenus[]> {
  const res = await fetch("https://lomnov.onrender.com/api/v1/menus?lang=eng");
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}

// Fetch property data by ID
export const fetchPropertyById = async (id: string): Promise<RealEstateItem> => {
  try {
    // Fixing the API endpoint format
    const response = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}/get/${id}`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch property');
    }
    // Ensure we return the data
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching property data');
  }
};
