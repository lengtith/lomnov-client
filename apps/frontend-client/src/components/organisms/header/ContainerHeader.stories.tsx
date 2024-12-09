import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ContainerHeader, { MenuProp } from './ContainerHeader';
import { within, userEvent } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';

// Sample menu data
const sampleMenu = [
  { id: 1, name: 'Home', slug: '/', lang: 'en' },
  { id: 2, name: 'Buy', slug: '/about', lang: 'en' },
  { id: 3, name: 'Rent', slug: '/contact', lang: 'en' },
];

// Meta configuration for the story
export default {
  title: 'Components/ContainerHeader',
  component: ContainerHeader,
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
    showLogo: {
      control: 'boolean',
      description: 'Toggle the visibility of the logo',
      defaultValue: true,
    },
    showAuthLinks: {
      control: 'boolean',
      description: 'Toggle the visibility of the authentication links',
      defaultValue: true,
    },
  },
} as Meta<MenuProp & { showLogo: boolean; showAuthLinks: boolean }>;

// Template for the ContainerHeader component
const Template: StoryFn<MenuProp & { showLogo: boolean; showAuthLinks: boolean }> = (args) => (
  <ContainerHeader {...args} />
);

// Default story for ContainerHeader
export const Default = Template.bind({});
Default.args = {
  menu: sampleMenu,
  showLogo: true,
  showAuthLinks: true,
};
Default.parameters = {
  docs: {
    storyDescription: 'The default state of the ContainerHeader component with a sample menu.',
  },
};

// Story with the menu opened
export const MenuOpened = Template.bind({});
MenuOpened.args = {
  menu: sampleMenu,
  showLogo: true,
  showAuthLinks: true,
};
MenuOpened.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const menuButton = await canvas.findByRole('button');
  await userEvent.click(menuButton);
  action('Menu toggled')();
};
MenuOpened.parameters = {
  docs: {
    storyDescription: 'Simulates the menu being opened by a user click.',
  },
};

// Story with an empty menu
export const EmptyMenu = Template.bind({});
EmptyMenu.args = {
  menu: [],
  showLogo: true,
  showAuthLinks: true,
};
EmptyMenu.parameters = {
  docs: {
    storyDescription: 'Displays the ContainerHeader component with an empty menu.',
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
  showLogo: true,
  showAuthLinks: true,
};
DifferentLanguageMenu.parameters = {
  docs: {
    storyDescription: 'Displays the ContainerHeader component with a menu in a different language (Spanish).',
  },
};

// Story with the logo hidden
export const LogoHidden = Template.bind({});
LogoHidden.args = {
  menu: sampleMenu,
  showLogo: false,
  showAuthLinks: true,
};
LogoHidden.parameters = {
  docs: {
    storyDescription: 'Displays the ContainerHeader component with the logo hidden.',
  },
};

// Story with the authentication links hidden
export const AuthLinksHidden = Template.bind({});
AuthLinksHidden.args = {
  menu: sampleMenu,
  showLogo: true,
  showAuthLinks: false,
};
AuthLinksHidden.parameters = {
  docs: {
    storyDescription: 'Displays the ContainerHeader component with the authentication links hidden.',
  },
};
