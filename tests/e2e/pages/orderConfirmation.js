const { pollCondition } = require('../utils/pollUtils')

module.exports = {
  sections: {
    orderConfirmationContainer: {
      selector: '*[data-testing=orderConfirmationContainer]',
      elements: {
        header: {
          selector: '*[data-testing=orderConfirmationHeader]',
        }
      },

      commands: [{
        asyncCheckIfOrderConfirmationPageVisible: function (browser, done) {
          const checkFn = callback => {
            browser.url(commandResult => {
              callback(commandResult.status === 0 && commandResult.value.includes('order-confirmation'))
            })
          }

          const onPollDone = pollResult => {
            browser.assert.ok(pollResult === 'conditionMet', 'Order confirmation page is visible')
            done()
          }

          pollCondition(checkFn, onPollDone)
        },

        ensureOrderConfirmationLoaded: function() {
          this.waitForElementPresent('*[data-testing="orderConfirmationContainer"]', 60000)

          return this
        },
      }],
    },
  }
}
