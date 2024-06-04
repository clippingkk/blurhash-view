import { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  framework: "@storybook/react-vite",
  // core: {
  //   builder: {
  //     name: 'webpack5',
  //     options: {
  //       lazyCompilation: true,
  //       fsCache: true
  //     },
  //   },
  // },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
};

export default config;
