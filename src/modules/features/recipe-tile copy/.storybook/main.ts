import type { StorybookConfig } from '@storybook/react/types'
import { base, generateWebpackFinal } from '@library/storybook'

const path = require('path')

const config: StorybookConfig = {
  ...base,
  addons: ['@storybook/addon-essentials', '@storybook/addon-controls'],
  stories: [
    `../src/**/*.stories.*`,
  ],
  webpackFinal: generateWebpackFinal({ path: path.resolve(__dirname, '../src') }),
}

module.exports = config
