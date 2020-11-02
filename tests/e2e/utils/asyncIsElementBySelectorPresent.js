function asyncIsElementBySelectorPresent(browser, selector, callback) {
  browser.element('css selector', selector, function (commandResult) {
    const isPresent = commandResult.status === 0
    callback(isPresent)
  })
}

module.exports = {
  asyncIsElementBySelectorPresent
}
