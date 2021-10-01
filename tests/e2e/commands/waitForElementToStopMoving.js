function createRecursiveGetLocationCallbackFor(selector, timeoutTime, pollInterval) {
  let previousLocation

  function assertNotTimedOut() {
    if (Date.now() > timeoutTime) {
      throw new Error(`Timed out waiting for element matching selector '${selector}' to stop moving`)
    }
  }

  function tryAgainSoon(nightwatchContext) {
    nightwatchContext.pause(pollInterval)
    nightwatchContext.getLocation(selector, recursiveGetLocationCallback)
  }

  function recursiveGetLocationCallback({value: location}) {
    assertNotTimedOut()

    const currentElementPosition = JSON.stringify(location)

    if (currentElementPosition !== previousLocation) {
      previousLocation = currentElementPosition
      tryAgainSoon(this)
    }
  }

  return recursiveGetLocationCallback
}

function waitForElementToStopMoving(selector, timeoutMilliseconds = 3000, pollInterval = 10) {
  const timeoutTime = Date.now() + timeoutMilliseconds

  this.getLocation(selector, createRecursiveGetLocationCallbackFor(selector, timeoutTime, pollInterval))

  return this
}

exports.command = waitForElementToStopMoving
