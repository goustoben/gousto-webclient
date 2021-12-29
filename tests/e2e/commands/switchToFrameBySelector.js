// Nightwatch can only switch to iframes given an id.  In case of a login
// iframe inside the Paypal's window, that iframe doesn't have the id.  So we
// set an artificially-created id on it.
function switchToFrameBySelector(selector, artificialId, callback = undefined) {
  const frameId = artificialId

  this
    .waitForElementVisible(selector)
    .execute(`var frame=document.querySelector('${selector}'); frame.id='${frameId}'`)
    .frame(frameId)

  return this
}

exports.command = switchToFrameBySelector
