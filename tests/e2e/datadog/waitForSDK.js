const { getIsLoaded } = require('./browserApi')

module.exports = {
  waitForSDK,
}

async function waitForSDK(browser, waitFor = 15) {
  if (waitFor <= 0) {
    console.error("DATADOG: Could not find SDK")
    return false
  }

  console.info(`DATADOG: Waiting ${waitFor} seconds for RUM SDK`)
  const hasLoaded = await getIsLoaded(browser)

  if (!hasLoaded) {
    const delay = 3
    await wait(browser, delay * 1000)
    return waitForSDK(browser, waitFor - delay)
  }

  console.info("DATADOG: SDK is ready")
  return true
}

async function wait(browser, ms) {
  return new Promise((resolve) => {
    global.setTimeout(resolve, ms)
  })
}
