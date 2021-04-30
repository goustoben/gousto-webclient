const { performSignUpFlowUpToPaymentStep } = require('./signupCommon')

module.exports = {
  'Sign-up with PayPal from /': function (browser) {
    const home = browser.page.home()
    const checkout = browser.page.checkoutV2()
    const welcome = browser.page.welcome()

    const url = home.api.launchUrl

    performSignUpFlowUpToPaymentStep(browser, url)

    browser
      .perform(function (browser, done) {
        checkout.section.checkoutContainer.section.payment.selectPaypalPaymentMethod(browser)
        done()
      })
      .perform(function (browser, done) {
        checkout.section.checkoutContainer.section.payment.asyncClickPaypalSetupButton(browser, done)
      })
      .perform(function (browser, done) {
        checkout.section.checkoutContainer.section.paypalWindow.asyncWaitPaypalWindowIsOpen(browser, done)
      })
      .perform(function (browser, done) {
        checkout.section.checkoutContainer.section.paypalWindow.asyncLoginAndConfirmPayment(browser, done)
      })
      .perform(function (browser, done) {
        checkout.section.checkoutContainer.section.payment.checkPaypalSetupButtonIsInvisible(browser)
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.asyncSkipPromoCodeErrorIfPresent(browser, done)
      })
      .perform(function (done) {
        welcome.section.welcomeContainer.checkIfWelcomePageVisible()
        done()
      })
      .end()
  },
  tags: ['sign-up', 'paypal'],
};
