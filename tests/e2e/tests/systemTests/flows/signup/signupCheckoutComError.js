const { performSignUpFlowUpToPaymentStep } = require('./signupCommon')

module.exports = {
  'Sign-up error for card name with checkout.com from /': function (browser) {
    const checkout = browser.page.checkoutV2()
    const welcome = browser.page.welcome()

    performSignUpFlowUpToPaymentStep(browser)

    browser
      .perform(function (done) {
        checkout.section.checkoutContainer.submitPaymentSectionWithoutCardName(browser)
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.goToNextStep()
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.checkIfErrorForNameVisible()
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.submitPaymentSectionWithoutBillingAddress(browser)
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.goToNextStep()
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.checkIfErrorForBillingAddressVisible()
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.submitPaymentSectionWithoutCardDetails(browser)
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.goToNextStep()
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.checkIfErrorForCardDetailsVisible(browser)
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.changeAndSubmitPaymentSection(browser)
        done()
      })
      .perform(function (done) {
        browser.pause(1000)
        checkout.section.checkoutContainer.goToNextStep()
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.asyncSkipPromoCodeErrorIfPresent(browser, done)
      })
      .perform(function (done) {
        browser.pause(3000)
        welcome.section.welcomeContainer.checkIfWelcomePageVisible()
        done()
      })
      .end()
  },
  tags: ['sign-up', 'menu', 'checkout', 'sign-up-error'],
};
