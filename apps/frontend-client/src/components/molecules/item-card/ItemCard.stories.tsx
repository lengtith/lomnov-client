import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import ItemCard, { ItemCardProps } from "./ItemCard";
// import { RealEstateItem } from "@/libs/types/api-properties/property-response";

const mockItem: any = {
  id: 1,
  user: "user1",
  transaction: "sell",
  category: "villa",
  title: "Beautiful Villa",
  description: "A beautiful villa with a great view.",
  thumbnail:
    "https://i.pinimg.com/736x/5f/71/e5/5f71e51ad525d565115d27cb368cef9b.jpg",
  images: [
    "https://i.pinimg.com/736x/5f/71/e5/5f71e51ad525d565115d27cb368cef9b.jpg",
  ],
  detail: {

    land_size: "21m x 54m",
    total_land_size: "1134 10m²",
    building_size: "16m x 45m",
    total_building_size: "720m²",
    road_size: "12m",
    bed_room:2,
    bath_room: 5,
    living_room: 1,
    kitchen: 1,
    parking: 1,
    garden: "garden",
    swimming_pool: "swimming pool",
    area: "200m²", // Add this line

  },
  address: "123 Main St, Anytown, USA",
  mapurl: "",
  favorite: true,
  status: true,
  lang: "eng",
  price: 2000,
};

export default {
  title: "Components/ItemCard",
  component: ItemCard,
  argTypes: {
    item: {
      control: "object",
      defaultValue: mockItem,
    },
  },
} as Meta;

const Template: StoryFn<ItemCardProps> = (args) => <ItemCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  item: mockItem,
};
