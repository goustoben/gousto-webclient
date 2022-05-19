const { beginCreatingOrderWithoutSubscriptionButStopAtPayment } = require('../../steps/signupCommon')
const { continueSignUpWithACreditCard } = require('../../steps/continueSignUpWithACreditCard')
const faker = require("faker")

module.exports = {
  'Order a box while starting at the Menu page': function (browser) {
    const accountCredentials = {email: faker.internet.email(), password: 'ValidPassword1!'}

    beginCreatingOrderWithoutSubscriptionButStopAtPayment(accountCredentials, browser)

    browser.perform(done => {
      browser.pause(5000)
      done()
    })

    continueSignUpWithACreditCard(browser)

    browser.end()
  },

  tags: ['addTransactionalOrder'],
}
