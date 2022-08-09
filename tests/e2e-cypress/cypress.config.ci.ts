import { defineConfig } from 'cypress'
import merge from 'ts-deepmerge'

import { baseConfig } from './cypress.config.base'

export default defineConfig(
  merge(baseConfig, {
    env: {
      DD_ENABLED: true,
      DD_APPLICATION_ID: '7eaa558f-a187-40c5-b743-9fd52d7aff3a',
      DD_CLIENT_TOKEN: 'pub7210de2a9d84977c7611bb974aa9f74f',
      DD_SERVICE: 'gousto-webclient-e2e-staging---test',
    },
  }),
)
