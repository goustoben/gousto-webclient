const { browserApi, waitForSDK } = require('../datadog')

module.exports = {
  command: trackDatadog
}

function trackDatadog() {
  const browser = this

  const BUILD = process.env.CIRCLE_BUILD_NUM
  if (!BUILD) {
    console.error("DATADOG: Could not retrieve CircleCI build")
  }

  this.perform(async (done) => {
    console.info("DATADOG: Waiting for Datadog SDK")

    const connected = await waitForSDK(browser)
    if (!connected) {
      return done()
    }

    console.info("DATADOG: Configure SDK")
    await browserApi.initialiseDatadog(browser)

    console.info("DATADOG: Set test context; build=" + BUILD)
    await browserApi.setDatadogTestContext(browser, {
      testName: browser.currentTest.module,
      build: BUILD
    })

    console.info("DATADOG: Test setup complete")
    done()
  })

  return this
}
