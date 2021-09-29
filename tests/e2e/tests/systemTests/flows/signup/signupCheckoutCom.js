const { performSignUpFlowUpToPaymentStep } = require('./signupCommon')

module.exports = {
  'Sign-up with checkout.com from /': function (browser) {
    const checkout = browser.page.checkoutV2()
    const welcome = browser.page.welcome()

    performSignUpFlowUpToPaymentStep(browser)

    browser
      .execute("window.__loadFeatures__({ features: { signupE2ETestName: { value: 'checkoutV2' }}})")
      .perform(function (done) {
        checkout.section.checkoutContainer.signupWithoutPaymentInfo(browser)
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.checkIfErrorsAreVisible(browser)
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.enterAllCardDetailsExceptCardNumber(browser)
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
        checkout.section.checkoutContainer.enterCardNumber(browser)
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.enterIncorrectCVV(browser)
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.goToNextStep()
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.checkCardVerificationFailed(browser, done)
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.enterCorrectCVV(browser)
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
        welcome.section.welcomeContainer.checkIfWelcomePageVisible()
        welcome.section.welcomeContainer.checkIfOrderScheduleContainerVisible()
        welcome.section.welcomeContainer.checkIfRafSectionVisible()
        done()
      })
      .end()
  },
  tags: ['sign-up', 'menu', 'checkout', 'sign-up-error', 'sign-up-success'],
}
