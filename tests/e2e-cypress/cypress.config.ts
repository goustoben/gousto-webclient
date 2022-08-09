import { defineConfig } from 'cypress'

export default defineConfig({
  screenshotsFolder: 'screenshots',
  videosFolder: 'videos',
  video: false,
  chromeWebSecurity: false,
  defaultCommandTimeout: 15000,
  env: {
    WAF_ACCESS_TOKEN: 'MOCK_TOKEN_VALUE',
  },
  e2e: {
    baseUrl: 'https://staging-webclient.gousto.info/',
    specPattern: './**/*.spec.*',
    supportFile: 'support/index.ts',
  },
})
