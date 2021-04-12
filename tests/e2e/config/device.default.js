module.exports = ({ globalWaitTimeout }) => ({
  globals: {
    waitForConditionTimeout: globalWaitTimeout,
    browser: 'desktop',
  },
  desiredCapabilities: {
    browserName: 'chrome',
    javascriptEnabled: true,
    acceptSslCerts: true
  }
})
