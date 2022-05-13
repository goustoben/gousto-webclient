import type { StorybookConfig } from '@storybook/react/types'

import path from 'path';

type WebpackFinal = StorybookConfig['webpackFinal']

type SassLoaderIncludePath = {
  path: string
}

export const generateWebpackFinal = (
  { path }: SassLoaderIncludePath
): WebpackFinal => {
  return async (config) => {
    config.module?.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path
    })

    return config;
  }
}

export const base: StorybookConfig = {
  stories: [
    `../src/modules/features/**/*.stories.*`,
  ],
  staticDirs: [path.resolve(__dirname, './assets')],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react',
  features: {
    storyStoreV7: true,
  },
  webpackFinal: generateWebpackFinal({ path: path.resolve(__dirname, '../../') }),
}
