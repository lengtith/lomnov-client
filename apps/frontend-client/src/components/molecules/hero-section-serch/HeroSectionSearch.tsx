"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from "next/link";
import { IconSearch, IconLocation } from '@/icons';
import { RealEstateItem } from '@/libs/types/api-properties/property-response';
import HeroSectionSearchList from './HeroSectionSearchList';

export interface HeroSectionSearchProps {
  properties: RealEstateItem[];
  title?: string,
  placeholder?: string;
  inputClassName?: string;
}

const HeroSectionSearch: React.FC<HeroSectionSearchProps> = ({
  properties,
  title= " Real Estate Plateform",
  placeholder = "Enter an address...",
  inputClassName = "",
}) => {
  const [search, setSearch] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowResults(e.target.value !== "");
  };

  const searchAddress = () => {
    if (search === "") {
      return properties;
    }
    return properties.filter((item) =>
      item.address[0].content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  const searchLocation = searchAddress();
  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-20 flex flex-col lg:gap-10 gap-3 justify-center items-center">
      <h1 className="text-[25px] lg:text-[40px] text-white uppercase font-[600]">
        {/* Real Estate Platform */}
        {title}
      </h1>
      <div ref={searchRef} className={`w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] h-[45px] md:h-[50px] bg-white rounded-md overflow-hidden flex flex-row items-center gap-5 px-5 ${inputClassName}`}>
        <input
          type="text"
          className="h-full outline-none py-4 w-[90%]"
          placeholder={placeholder}
          onChange={handleSearch}
        />
        <div className="border-[0.8px] border-solid border-black h-[20px]"></div>
        <IconLocation className="text-blue-500 text-[18px]" />
      </div>
      {showResults && searchLocation.length !== 0 && (
        <HeroSectionSearchList searchLocation={searchLocation} searchRef={searchRef} />
      )}
    </div>
  );
};

export default HeroSectionSearch;
