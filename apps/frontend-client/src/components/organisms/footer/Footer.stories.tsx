import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Footer, { FooterProps } from './Footer';

export default {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    aboutText: { control: 'text', defaultValue: 'Real Estate is an online real estate platform that allows users to buy, rent, sell, and manage their businesses.' },
    contactPhone: { control: 'text', defaultValue: '(+855)12358993' },
    contactLocation: { control: 'text', defaultValue: 'Corner Street 302 and Street 63 Sangkat Boeng Keng Kang Ti Muoy, Phnom Penh 12302' },
    companyName: { control: 'text', defaultValue: 'Real Estate' },
    facebookLink: { control: 'text', defaultValue: 'https://facebook.com' },
    twitterLink: { control: 'text', defaultValue: 'https://twitter.com' },
    instagramLink: { control: 'text', defaultValue: 'https://instagram.com' },
  },
} as Meta;

const Template: StoryFn<FooterProps> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  aboutText: 'Real Estate is an online real estate platform that allows users to buy, rent, sell, and manage their businesses.',
  contactPhone: '(+855)12358993',
  contactLocation: 'Corner Street 302 and Street 63 Sangkat Boeng Keng Kang Ti Muoy, Phnom Penh 12302',
  companyName: 'Real Estate',
  facebookLink: 'https://facebook.com',
  twitterLink: 'https://twitter.com',
  instagramLink: 'https://instagram.com',
};
