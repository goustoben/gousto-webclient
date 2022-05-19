const {beginSignUpButStopAtPayment} = require('../../steps/signupCommon')
const faker = require("faker")
const { continueSignUpWithACreditCard } = require('../../steps/continueSignUpWithACreditCard')

module.exports = {
  'Critical user journey': function (browser) {
    const accountCredentials = {email: faker.internet.email(), password: 'ValidPassword1!'}

    beginSignUpButStopAtPayment(accountCredentials, browser)
    continueSignUpWithACreditCard(browser)
    logOutAndLogIn(accountCredentials, browser)
    editAnExistingOrder(browser)

    browser.end()
  },

  tags: ['criticalUserJourney'],
}

function logOutAndLogIn(accountCredentials, browser) {
  const shared = browser.page.shared()

  browser
    .logJourneyStep('Log out and log in')
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
  const checkout = browser.page.checkoutV2()

  browser
    .logJourneyStep('Edit an existing order')
    .logJourneyStep('Recipes are visible')
    .perform(done => {
      menu.section.recipes.checkIfRecipesVisible()
      done()
    })
    .perform(done => {
      menu.section.menuContainer.clickNextButton()
      done()
    })
    .logJourneyStep('Clicking dates of existing order')
    .perform(done => {
      menu.section.menuContainer.clickDateOfExistingOrder()
      done()
    })
    .perform(done => {
      browser.pause(1000)
      menu.section.menuContainer.clickContinueButton()
      done()
    })
    .logJourneyStep('Ensure Checkout button is clickable')
    .perform(done => {
      menu.section.bottomBar.checkIfCheckoutButtonClickable()
      done()
    })
    .logJourneyStep('Go to checkout')
    .perform(done => {
      menu.section.menuContainer.goFromMenuToCheckout()
      done()
    })
    .logJourneyStep('Checking confirmation page is visible')
    .perform(done => {
      orderConfirmation.section.orderConfirmationContainer.ensureOrderConfirmationLoaded()
      done()
    })
    .logJourneyStep('Done!')
}
