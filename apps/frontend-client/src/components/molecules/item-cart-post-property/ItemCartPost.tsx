"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import HeartOutline from "@/icons/HeartOutline";
import HeartInline from "@/icons/HeartInline";
import BathRoom from "@/icons/BathRoom";
import BedRoom from "@/icons/BedRoom";
import Compare from "@/icons/Compare";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import { CiMenuKebab } from "react-icons/ci";
import DeleteConfirmationModal from "@/components/atoms/popUpDelete/YesNoDelete";

export interface ItemCardProps {
  item: RealEstateItem;
  flexRow?: boolean;
  favourited?: boolean;
  toggleCompare: (item: RealEstateItem) => void;
  isSelected: boolean;
  disabled: boolean;
}

const ItemCardPost = ({ item, flexRow = false, favourited = false, toggleCompare
  , isSelected,
 }: ItemCardProps) => {
  const [isLike, setIsLike] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Function to toggle the favorite status
  const toggleIsLike = async (id: string) => {
    try {
      const response = await axiosInstance.put(`${API_ENDPOINTS.TOGGLE_FAVOURITE_PROPERTY}/${id}`);
      if (response.status === 200) {
        setIsLike((prev) => !prev);
      }
    } catch (error) {
      console.error("Error toggling favorite status", error);
    }
  };
   //handle delete
   const handleDelete = async () => {
    try {
      await axiosInstance.delete(`${API_ENDPOINTS.MY_PROPERTY}/${item._id}`);
      alert("Property deleted");
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting property", error);
    }
  };

  // Fetch the current view count for the property
  const fetchViewCount = async (id: string) => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}/${id}/views`);
      if (response.status === 200) {
        setViewCount(response.data.views); // Assuming response.data.views holds the view count
      }
    } catch (error) {
      console.error("Error fetching view count", error);
    }
  };

  useEffect(() => {
    fetchViewCount(item._id);
  }, [item._id]);

  const title = item.title[0]?.content || "Untitled";
  const description = item.description[0]?.content || "No description available.";
  const address = item.address[0]?.content || "No address available.";

  return (
    <>
    <div
      className={
        flexRow
          ? "flex w-full h-[150px] gap-3 rounded-[20px] overflow-hidden shadow-md bg-white border-[1px] border-neutral p-4"
          : "w-full h-[380px] rounded-[20px] overflow-hidden shadow-md flex flex-col gap-5 bg-white border-[1px] border-neutral p-4 mb-4"
      }
    >
      <div
        className={
          flexRow
            ? "bg-olive-green w-[50%] relative  rounded-[15px] hover:transition-all duration-1000 ease-out"
            : "w-full h-[65%] relative  overflow-hidden bg-olive-green rounded-[15px] hover:transition-all duration-1000 ease-out"
        }
      >
        <Link
          href={`/detail/${item._id}`}
          className="absolute w-full h-full rounded-[10px]  transition-transform duration-300 transform hover:scale-110"
        >
          <div className="group absolute left-0 top-0 w-full h-full hover:bg-[#00000033] z-2 transition duration-300"></div>
          <Image src={item.thumbnail} alt={title} width={500} height={500} className="w-full h-full" />
        </Link>

        {/* Item Type */}
        <p className="absolute py-[3px] px-4 top-[10px] left-[17px] bg-olive-green text-white rounded-[13px] font-[600] z-2">
          {item.category[0]?.content || ""}
        </p>

        {/* Menu Icon */}
        <div className="absolute top-3 right-5 bg-[#F3F4F6]/50 px-2 py-2 rounded-full ">
          <CiMenuKebab
            className="text-[16px] text-black cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          />
          {menuOpen && (
            <div className="absolute w-[150px] top-10 right-0 border border-slate-300 bg-white/90 shadow-md rounded-[8px] py-2 px-2 z-10 transition duration-700 ease-in-out ">
                
              <button
                className=" border-2  mb-2 border-gray-200 text-center block w-full text-white py-1 px-4 bg-olive-green hover:bg-olive-gray rounded-md text-sm"
                onClick={() => console.log("Update clicked")}
              >
                Update
              </button>
              <button
                className="block w-full border-2 py-1 px-4  text-center bg-[#E9678A] hover:bg-[#f38da8] rounded-md text-sm text-white"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Price */}
        <p className="absolute bottom-[10px] left-[17px] text-white font-helvetica font-[600] text-[16px]">
          ${item.price}
        </p>
      </div>

      <div className={flexRow ? "flex flex-col text-[18px] gap-1 w-[50%]" : "flex flex-col gap-1 py-2"}>
        <p className="capitalize font-[600] text-olive-drab text-[18px]">{title}</p>
        <p className={flexRow ? "mb-5" : ""}>{address}</p>
        <div className="bottom-0 w-full">
          <div className="flex items-center">
            <div
              className={
                flexRow ? "w-[60%] flex gap-3 items-center" : "w-[50%] gap-7 flex items-center"
              }
            >
              <div className="flex justify-between font-helvetica text-helvetica-paragraph">
                <BathRoom className="text-olive-drab text-[20px] gap-1" />
                <span className="font-[600] text-[12px] font-helvetica ">{item.detail[0]?.content.bathrooms} Bath</span>
              </div>
              <div className="flex justify-between font-helvetica text-helvetica-paragraph font-bold">
                <BedRoom className="text-olive-drab text-[20px]" />
                <span className="font-[600] text-[12px] font-helvetica">{item.detail[0]?.content.bedrooms} Bed</span>
              </div>
            </div>
            <div className="w-[40%] ml-5 flex justify-end items-center relative">
              {/* Favorite Icon */}
              <div
                className="absolute bottom-[90px] ml-10 px-1 py-1 rounded-full bg-[#F3F4F6] right-[17px] cursor-pointer z-20 border-2 border-gray-200"
                onClick={async () => await toggleIsLike(item._id)}
              >
                {favourited ? (
                  <HeartInline className="] text-[25px]" />
                ) : isLike ? (
                  <HeartInline className=" text-[25px] text-[#E9678A]" />
                ) : (
                  <HeartOutline className="text-[25px] text-[#E9678A]" />
                )}
              </div>
              {/* Compare Button */}
            <div className="w-[40%] flex justify-end items-center cursor-pointer">
              <Compare
                className={`text-olive-drab text-[20px] ${isSelected ? "text-blue-500" : ""}`}
                onClick={() => toggleCompare(item)} // Pass single item, not array
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        propertyTitle={title}
        propertyImage={item.thumbnail}
      />
    </>
  );
};

export default ItemCardPost;

