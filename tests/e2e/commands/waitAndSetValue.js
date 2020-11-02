const waitAndSetValue = function (selector, value) {
  this
    .waitForElementVisible(selector)
    .setValue(selector, value)

  return this
}

module.exports = waitAndSetValue
