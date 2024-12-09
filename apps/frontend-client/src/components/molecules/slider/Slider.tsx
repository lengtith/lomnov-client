import React from 'react'
import { RealEstateItem } from '@/libs/types/api-properties/property-response';
import ExclusiveHomesSlider from '@/components/organisms/exclusive-slider/ExclusiveHomeSlider';
import axiosInstance from '@/libs/axios';
import { API_ENDPOINTS } from '@/libs/const/api-endpoints';
// Fetch properties on the server
async function fetchProperties(): Promise<RealEstateItem[]> {
  const res = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}`);
  if (res.status !== 200) {
    throw new Error("Failed to fetch");
  }
  return res.data.properties;
}

async function  Slider() {
  const item= await fetchProperties();

  return (
    <>
      <ExclusiveHomesSlider items={item}/>
    </>
  )
}

export default Slider
