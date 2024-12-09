import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import NavigateList from './NavigateList';
import { IMenus } from './NavigateList';

// Sample menu data
const sampleMenu = [
  { id: 1, name: 'Home', slug: '/', lang: 'en' },
  { id: 2, name: 'Buy', slug: '/buy', lang: 'en' },
  { id: 3, name: 'Rent', slug: '/rent', lang: 'en' },
];

// Meta configuration for the story
export default {
  title: 'Components/NavigateList',
  component: NavigateList,
  argTypes: {
    menu: {
      control: 'object',
      description: 'Array of menu items to display',
      defaultValue: sampleMenu,
      table: {
        type: { summary: 'IMenus[]' },
        defaultValue: { summary: '[]' },
      },
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color of the navigation list',
      defaultValue: 'white',
    },
    textColor: {
      control: 'color',
      description: 'Text color of the navigation list',
      defaultValue: 'black',
    },
  },
} as Meta;

// Template for the NavigateList component
const Template: StoryFn<{ menu: IMenus[], backgroundColor: string, textColor: string }> = (args) => <NavigateList {...args} />;

// Default story for NavigateList
export const Default = Template.bind({});
Default.args = {
  menu: sampleMenu,
  backgroundColor: 'white',
  textColor: 'black',
};
Default.parameters = {
  docs: {
    storyDescription: 'The default state of the NavigateList component with a sample menu.',
  },
};

// Story with an empty menu
export const EmptyMenu = Template.bind({});
EmptyMenu.args = {
  menu: [],
  backgroundColor: 'white',
  textColor: 'black',
};
EmptyMenu.parameters = {
  docs: {
    storyDescription: 'Displays the NavigateList component with an empty menu.',
  },
};

// Story with a different language menu
export const DifferentLanguageMenu = Template.bind({});
DifferentLanguageMenu.args = {
  menu: [
    { id: 1, name: 'Inicio', slug: '/', lang: 'es' },
    { id: 2, name: 'Acerca de', slug: '/about', lang: 'es' },
    { id: 3, name: 'Contacto', slug: '/contact', lang: 'es' },
  ],
  backgroundColor: 'white',
  textColor: 'black',
};
DifferentLanguageMenu.parameters = {
  docs: {
    storyDescription: 'Displays the NavigateList component with a menu in a different language (Spanish).',
  },
};
