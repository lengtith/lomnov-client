import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import ItemCardPopularLocation from "./ItemCardPopularLocation";

interface Item {
  id: string;
  name: string;
  thumbnail: string;
  rent: number;
  sell: number;
}

const mockItem: Item = {
  id: "1",
  name: "Popular Location",
  thumbnail: "https://i.pinimg.com/736x/5f/71/e5/5f71e51ad525d565115d27cb368cef9b.jpg",
  rent: 1200,
  sell: 300000,
};

export default {
  title: "Components/ItemCardPopularLocation",
  component: ItemCardPopularLocation,
  argTypes: {
    item: {
      control: "object",
      defaultValue: mockItem,
    },
  },
} as Meta;

const Template: StoryFn<{ item: Item }> = (args) => <ItemCardPopularLocation {...args} />;

export const Default = Template.bind({});
Default.args = {
  item: mockItem,
};
