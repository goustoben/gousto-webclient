module.exports = () => ({
  globals: {
    browser: 'desktop',
  },
  desiredCapabilities: {
    chromeOptions: {
      args: [
        '--window-size=1300,800'
      ]
    }
  }
})
