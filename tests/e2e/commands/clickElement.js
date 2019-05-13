const clickElement = function (name) {
  this
    .waitForElementVisible(name)
    .click(name)

  return this
}

module.exports = clickElement
