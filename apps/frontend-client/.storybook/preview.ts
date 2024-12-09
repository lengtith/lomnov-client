import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import "../src/app/globals.css";
import { handlers } from "../src/mocks/handlers";

// Initialize MSW with the correct service worker URL
initialize({
  serviceWorker: {
    url: '/lomnov/public/mockServiceWorker.js',  // Ensure this path matches where the service worker file is located
  },
});

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      // theme: MyTheme,
    },
    msw: {
      handlers,
    },
  },
  loaders: [mswLoader],
};

export default preview;
