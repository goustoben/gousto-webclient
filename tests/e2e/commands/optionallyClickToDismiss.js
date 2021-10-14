function optionallyClickToDismiss(elementSelector) {
  let elementVisible

  this.element('css selector', elementSelector, (result) => {
    if (result.status === 0) {
      this.elementIdDisplayed(result.value.ELEMENT, ({status, value}) => {
        elementVisible = status === 0 && value
      })
    }
  })

  this.perform(() => {
    if (elementVisible) {
      this.safelyClick(elementSelector)
      this.waitForElementNotPresent(elementSelector, 3000)
    }
  })

  return this
}

exports.command = optionallyClickToDismiss
