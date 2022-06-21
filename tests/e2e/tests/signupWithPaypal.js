const {beginSignUpButStopAtPayment} = require('../steps/signupCommon')
const faker = require("faker")

module.exports = {
  'Sign-up using a PayPal account': function (browser) {
    beginSignUpButStopAtPayment({
      email: faker.internet.email(),
      password: 'ValidPassword1!'
    }, browser)
    continueSignUpWithAPayPalAccount(browser)

    browser.end()
  },
  tags: ['sign-up', 'paypal', 'unstable'],
}

function continueSignUpWithAPayPalAccount(browser) {
  const checkout = browser.page.checkoutV2()
  const welcome = browser.page.welcome()

  let mainWindowHandle, paypalWindowHandle

  const setPaypalWindowHandle = (value) => {
    paypalWindowHandle = value
  }

  browser
    .logJourneyStep('Continue sign-up with a PayPal account')
    .perform(function (browser, done) {
      checkout.section.checkoutContainer.section.payment.selectPaypalPaymentMethod(browser)
      done()
    })
    .windowHandle(result => {
      mainWindowHandle = result.value
    })
    .perform(function (browser, done) {
      checkout.section.checkoutContainer.section.payment.asyncClickPaypalSetupButton(browser, done)
    })
    .perform(function (browser, done) {
      checkout.section.checkoutContainer.section.paypalWindow.asyncWaitPaypalWindowIsOpen(
        browser,
        mainWindowHandle,
        setPaypalWindowHandle,
        done
      )
    })
    .perform(function (browser, done) {
      checkout.section.checkoutContainer.section.paypalWindow.asyncSwitchToPaypalWindow(
        browser,
        paypalWindowHandle,
        done
      )
    })
    .perform(function (browser, done) {
      checkout.section.checkoutContainer.section.paypalWindow.asyncLoginAndConfirmPayment(browser, mainWindowHandle, done)
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
}
