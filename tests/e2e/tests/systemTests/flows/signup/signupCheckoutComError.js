const { performSignUpFlowUpToPaymentStep } = require('./signupCommon')

module.exports = {
  'Sign-up error for card name with checkout.com from /': function (browser) {
    const checkout = browser.page.checkoutV2()
    const welcome = browser.page.welcome()

    performSignUpFlowUpToPaymentStep(browser)

    browser
      // 1: no fields entered at all
      .perform(function (done) {
        checkout.section.checkoutContainer.signupWithoutPaymentInfo(browser)
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.checkIfErrorsAreVisible(browser)
        done()
      })
      // 2: no card number
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
      // 3: wrong CVV
      .perform(function (done) {
        checkout.section.checkoutContainer.enterCardNumber(browser)
        done()
      })
      // 3: wrong CVV
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
      // 4: proceed successfully
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
        browser.pause(3000)
        welcome.section.welcomeContainer.checkIfWelcomePageVisible()
        done()
      })
      .end()
  },
  tags: ['sign-up', 'menu', 'checkout', 'sign-up-error'],
}
