import { defineConfig } from 'cypress'
import merge from 'ts-deepmerge'

import { baseConfig } from './cypress.config.base'

export default defineConfig(
  merge(baseConfig, {
    env: {
      DD_ENABLED: false,
    },
  }),
)
