export const baseConfig: Partial<Cypress.UserConfigOptions> = {
  screenshotsFolder: 'screenshots',
  videosFolder: 'videos',
  video: false,
  chromeWebSecurity: false,
  defaultCommandTimeout: 15000,
  e2e: {
    baseUrl: 'https://staging-webclient.gousto.info/',
    specPattern: './**/*.spec.*',
    supportFile: 'support/index.ts',
  },
}
