function safelyClick(selector, callback = undefined) {
  this.waitForElementVisible(selector)

  this.getTagName(selector, ({status, value}) => {
    if (status === 0 && value === 'button') {
      this.expect.element(selector).to.be.enabled.before(3000)
    }

    this.waitForElementToStopMoving(selector)
    this.clickAndThrowOnFailure(selector, callback)
  })

  return this
}

exports.command = safelyClick
