import { IconSearch } from '@/icons';
import Link from 'next/link';
import React, { RefObject } from 'react';
import { RealEstateItem } from '@/libs/types/api-properties/property-response';

export interface HeroSectionSearchListProps {
  searchLocation: RealEstateItem[];
  searchRef: RefObject<HTMLDivElement>;
  backgroundColor?: string;
  textColor?: string;
}

const HeroSectionSearchList: React.FC<HeroSectionSearchListProps> = ({
  searchLocation,
  searchRef,
  backgroundColor = '#ffffff',
  textColor = '#000000',
}) => {
  return (
    <div
      ref={searchRef}
      className="w-[80%] md:w-[60%] xl:w-[40%] h-fit absolute top-[110%] border-[0.8px] border-gray-100 rounded-md p-5 shadow-slate-100 shadow-md max-h-[300px] overflow-auto"
      style={{ backgroundColor }}
    >
      <ul className="flex flex-col gap-3 md:gap-5" style={{ color: textColor }}>
        {searchLocation.map((item, key) => (
          <Link key={key} href="" className="flex flex-row gap-5">
            <span className="w-[90%] text-[14px] md:text-[16px]">{item.address[0].content}</span>
            <IconSearch props="text-[20px] text-[gray]" />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default HeroSectionSearchList;
