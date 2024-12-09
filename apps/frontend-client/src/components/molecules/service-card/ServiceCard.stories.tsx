import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import ServiceCard from "./ServiceCard";

interface Item {
  id: string;
  name: string;
  thumbnail: string;
  rent: number;
  sell: number;
}

const mockItem: Item = {
  id: "1",
  name: "Service Name",
  thumbnail: "https://via.placeholder.com/200",
  rent: 1200,
  sell: 300000,
};

export default {
  title: "Components/ServiceCard",
  component: ServiceCard,
  argTypes: {
    item: {
      control: "object",
      defaultValue: mockItem,
    },
  },
} as Meta;

const Template: StoryFn<{ item: Item }> = (args) => <ServiceCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  item: mockItem,
};
