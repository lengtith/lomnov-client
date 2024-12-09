"use client";

import React, { useState, useEffect } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "../item-card/ItemCard";
import { ArrowDown, ArrowUp } from "@/icons";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import ComparisonBar from "@/components/molecules/comparison-bar/ComparisionBar";
import { toggleCompare } from "@/libs/const/toggleCompare";

async function fetchRelatedProperties(
  category: string,
  address: string,
): Promise<RealEstateItem[]> {
  try {
    const res = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}?category=${category}&address=${address}`);
    return res.data.properties;
  } catch (error) {
    throw new Error("Failed to fetch related properties");
  }
}

const RecommendedProperties = ({
  category,
  address,
}: {
  category: string;
  address: string;
}) => {
  const [relatedProperties, setRelatedProperties] = useState<RealEstateItem[]>([]);
  const [visibleItems, setVisibleItems] = useState(4);
  const [showLess, setShowLess] = useState(false);
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]); // Comparison state

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const properties = await fetchRelatedProperties(category, address);
        setRelatedProperties(properties);
      } catch (error) {
        console.error(error);
      }
    };

    loadProperties();
  }, [category, address]);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const transitions = useTransition(relatedProperties.slice(0, visibleItems), {
    keys: (item) => item._id,
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 300, friction: 30 },
  });

  const containerSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.3s, transform 0.3s",
  });

  const handleLoadMore = () => {
    setVisibleItems((prevCount) => prevCount + 4);
    setShowLess(true);
  };

  const handleShowLess = () => {
    setVisibleItems(4);
    setShowLess(false);
  };

  // Handle comparison toggling using the imported toggleCompare function
  const handleToggleCompare = (items: RealEstateItem[]) => {
    toggleCompare(items, selectedItems, setSelectedItems);
  };

  return (
    <animated.div
      ref={ref}
      className="mt-10 max-w-[1300px] mx-auto"
      style={containerSpring}
    >
      <h2 className="text-2xl mb-4 font-helvetica font-bold text-charcoal">
        Recommended Properties
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {transitions((style, item) => {
          const isSelected = selectedItems.some((selectedItem) => selectedItem._id === item._id);
          return (
            <animated.div key={item._id} style={style}>
              <ItemCard
                key={item._id}
                item={item}
                toggleCompare={() => handleToggleCompare([item])}
                isSelected={isSelected}
                disabled={selectedItems.length >= 2 && !isSelected}
              />
            </animated.div>
          );
        })}
      </div>
      <div className="flex items-center justify-center font-helvetica text-helvetica-paragraph text-charcoal mt-5">
        {visibleItems < relatedProperties.length && (
          <button
            onClick={handleLoadMore}
            className="flex flex-col items-center text-center justify-center rounded-md"
          >
            <span>Load More</span>
            <ArrowDown props="w-[20px]" />
          </button>
        )}
        {visibleItems > 4 && (
          <button
            onClick={handleShowLess}
            className="flex flex-col items-center text-center justify-center rounded-md"
          >
            <ArrowUp props="w-[20px]" />
            <span>Show Less</span>
          </button>
        )}
      </div>
      {/* Comparison Bar at the top */}
      <ComparisonBar selectedItems={selectedItems} toggleCompare={setSelectedItems} /> 
    </animated.div>
  );
};

export default RecommendedProperties;
