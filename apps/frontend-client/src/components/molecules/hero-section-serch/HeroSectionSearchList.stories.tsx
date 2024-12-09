import React, { useRef } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import HeroSectionSearchList, { HeroSectionSearchListProps } from './HeroSectionSearchList';
import { RealEstateItem } from '@/libs/types/api-properties/property-response';

// Sample data
// const sampleSearchLocation: RealEstateItem[] = [
//   {
//     id: 1,
//     user: "user1",
//     transaction: "sell",
//     category: "villa",
//     title: "Beautiful Villa",
//     description: "A beautiful villa with a great view.",
//     thumbnail: "https://i.pinimg.com/736x/5f/71/e5/5f71e51ad525d565115d27cb368cef9b.jpg",
//     images: [
//       "https://i.pinimg.com/736x/5f/71/e5/5f71e51ad525d565115d27cb368cef9b.jpg"
//     ],
//     detail: {
//       land_size: "21m x 54m",
//       total_land_size: "1134 10m²",
//       building_size: "16m x 45m",
//       total_building_size: "720m²",
//       road_size: "12m",
//       area: "",
//       bed_room: 4,
//       bath_room: 5,
//       living_room: 1,
//       kitchen: 1,
//       parking: 1,
//       garden: "garden",
//       swimming_pool: "swimming pool",
//     },
//     address: "123 Main St, Anytown, USA",
//     mapurl: "",
//     favorite: true,
//     status: true,
//     lang: "eng",
//     price: 13000

//   },
//   {
//     id: 2,
//     user: "user2",
//     transaction: "rent",
//     category: "apartment",
//     title: "Modern Apartment",
//     description: "A modern apartment in the city center.",
//     thumbnail: "https://i.pinimg.com/736x/5f/71/e5/5f71e51ad525d565115d27cb368cef9b.jpg",
//     images: [
//       "https://i.pinimg.com/736x/5f/71/e5/5f71e51ad525d565115d27cb368cef9b.jpg"
//     ],
//     detail: {
//       land_size: "21m x 54m",
//       total_land_size: "1134 10m²",
//       building_size: "16m x 45m",
//       total_building_size: "720m²",
//       road_size: "12m",
//       area: "",
//       bed_room: 4,
//       bath_room: 5,
//       living_room: 1,
//       kitchen: 1,
//       parking: 1,
//       garden: "garden",
//       swimming_pool: "swimming pool"
//     },
//     address: "456 Market St, Metropolis, USA",
//     mapurl: "",
//     favorite: true,
//     status: true,
//     lang: "eng",
//     price: 13000
//   }
// ];

export default {
  title: 'Components/HeroSectionSearchList',
  component: HeroSectionSearchList,
  argTypes: {
    searchLocation: { control: 'object', /* defaultValue: sampleSearchLocation */},
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
  },
} as Meta;

const Template: StoryFn<HeroSectionSearchListProps & { backgroundColor: string; textColor: string }> = (args) => {
  const searchRef = useRef<HTMLDivElement>(null);

  const { backgroundColor, textColor, ...rest } = args;

  return (
    <div style={{ backgroundColor: backgroundColor, color: textColor }}>
      <HeroSectionSearchList {...rest} searchRef={searchRef} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  // searchLocation: sampleSearchLocation,
  backgroundColor: '#ffffff',
  textColor: '#000000',
};
