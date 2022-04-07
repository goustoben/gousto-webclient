function continueSignUpWithACreditCard(browser) {
  const checkout = browser.page.checkoutV2()
  const welcome = browser.page.welcome()

  browser
    .logJourneyStep('Continue sign-up with a credit card')
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
}

module.exports = {
  continueSignUpWithACreditCard,
};
