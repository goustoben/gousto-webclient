const {beginSignUpButStopAtPayment} = require('../../steps/signupCommon')
const faker = require("faker")

module.exports = {
  'Critical user journey': function (browser) {
    const accountCredentials = {email: faker.internet.email(), password: 'ValidPassword1!'}

    beginSignUpButStopAtPayment(accountCredentials, browser)
    continueSignUpWithACreditCard(browser)
    logOutAndLogIn(accountCredentials, browser)
    editAnExistingOrder(browser)
    orderANewBox(browser)

    browser.end()
  }
}

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

function logOutAndLogIn(accountCredentials, browser) {
  const shared = browser.page.shared()

  browser
    .logJourneyStep('Log in and log out')
    .perform(function (browser, done) {
      shared.section.body.logout()
      shared.section.header.checkUserLoggedOut()
      browser.assert.title('Recipe Boxes | Get Fresh Food & Recipes Delivered | Gousto')
      done()
    })

  browser
    .perform(function (browser, done) {
      browser.safelyClick('header a[href="/menu"]')
      shared.section.body.submitPromo()
      shared.section.body.openLoginDialog()
      shared.section.body.isRememberMeCheckboxVisible()
      shared.section.body.completeLogin(accountCredentials.email, accountCredentials.password)
      shared.section.header.checkUserLoggedIn()
      browser.assert.urlContains("/menu")
      done()
    })
}

function editAnExistingOrder(browser) {
  const menu = browser.page.menu()
  const orderConfirmation = browser.page.orderConfirmation()

  browser
    .logJourneyStep('Edit an existing order')
    .perform(done => {
      menu.section.recipes.checkIfRecipesVisible()
      done()
    })
    .perform(done => {
      menu.section.menuContainer.clickNextButton()
      done()
    })
    .perform(done => {
      menu.section.menuContainer.clickDateOfExistingOrder()
      done()
    })
    .perform(done => {
      browser.pause(1000)
      menu.section.menuContainer.clickContinueButton()
      done()
    })
    .perform(done => {
      menu.section.bottomBar.checkIfCheckoutButtonClickable()
      done()
    })
    .perform(done => {
      menu.section.menuContainer.goFromMenuToCheckout()
      done()
    })
    .perform(done => {
      browser.pause(1000)
      orderConfirmation.section.orderConfirmationContainer.asyncCheckIfOrderConfirmationPageVisible(browser, done)
    })
}

function orderANewBox(browser) {
  const menu = browser.page.menu()
  const orderConfirmation = browser.page.orderConfirmation()

  browser
    .logJourneyStep('Order a new box')
    .perform(done => {
      menu.navigate()
      done()
    })
    .perform(done => {
      menu.section.recipes.checkIfRecipesVisible()
      done()
    })
    .perform(done => {
      menu.section.menuContainer.clickNextButton()
      done()
    })
    .perform(done => {
      menu.section.menuContainer.clickDateOfNewOrder()
      done()
    })
    .perform(done => {
      menu.section.menuContainer.clickContinueButton()
      done()
    })
    .perform(done => {
      menu.section.recipes.checkIfRecipesVisible()
      done()
    })
    .perform(done => {
      menu.section.recipes.addRecipes()
      done()
    })
    .perform(done => {
      browser.pause(8000)
      menu.section.bottomBar.checkIfCheckoutButtonClickable()
      done()
    })
    .perform(done => {
      menu.section.menuContainer.goFromMenuToCheckout()
      done()
    })
    .perform(done => {
      orderConfirmation.section.orderConfirmationContainer.asyncCheckIfOrderConfirmationPageVisible(browser, done)
    })
}
