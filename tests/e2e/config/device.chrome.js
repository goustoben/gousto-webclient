module.exports = () => ({
  globals: {
    browser: 'desktop',
  },
  desiredCapabilities: {
    chromeOptions: {
      args: [
        '--window-size=3000,3000'
      ]
    }
  }
})
