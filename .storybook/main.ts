import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    (config.resolve as any).alias = {
      ['@']: [path.resolve(__dirname, '../src')],
    };
    return config;
  },
  babel: async (options) => ({
    ...options,
    presets: [
      ...options.presets,
      ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
    ],
  }),
};
export default config;
