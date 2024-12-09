import type { StorybookConfig } from "@storybook/react-webpack5";
import { join, dirname } from "path";
const custom = require('../webpack.config.js');


/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  webpackFinal: async (config, {configType}) => {
    return {...config, module:{...config.module, rules: custom.module.rules}};
  },

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },
};
export default config;
