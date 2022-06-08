const faker = require("faker")

module.exports = {
  beginSignUpButStopAtPayment: function (accountCredentials = {
    email: faker.internet.email(),
    password: 'ValidPassword1!'
  }, browser) {
    const home = browser.page.home()
    const menu = browser.page.menu()
    const shared = browser.page.shared()
    const promoModal = shared.section.body
    const signup = browser.page.signup()
    const checkout = browser.page.checkoutV2()
    const cookiePolicy = browser.page.cookiePolicy()

    browser
      .logJourneyStep('Begin sign-up but stop at payment')
      .url(home.api.launchUrl)
      .trackDatadog()
      .perform(function (done) {
        cookiePolicy.section.cookiePolicyBanner.dismissCookieBannerIfPresent()
        done()
      })
      .perform(function (done) {
        home.section.hero.goToSignUp()
        done()
      })
      .perform(function (done) {
        promoModal.submitPromo()
        done()
      })
      .perform(function (done) {
        signup.section.boxSizeStep.goToNextStep()
        done()
      })
      .perform(function (done) {
        signup.section.postcodeStep.setPostcode()
        done()
      })
      .perform(function (done) {
        signup.section.postcodeStep.goToNextStep()
        done()
      })
      .perform(function (done) {
        signup.section.deliveryStep.selectEarliestAvailableDay()
        done()
      })
      .perform(function (done) {
        signup.section.deliveryStep.goToNextStep()
        done()
      })
      .perform(function (done) {
        signup.section.sellThePropositionPage.goToNextStep(browser)
        done()
      })
      .perform(function (done) {
        menu.section.recipes.checkIfRecipesVisible()
        done()
      })
      .perform(async function (done) {
        // Flaky fix count: 2
        await menu.section.recipes.addRecipes()
        done()
      })
      .perform(function (done) {
        menu.section.menuContainer.goFromMenuToCheckout()
        done()
      })

    browser.perform(function (done) {
      checkout.section.checkoutContainer.ensureCheckoutLoaded(browser)
      checkout.section.checkoutContainer.submitAccountSection(accountCredentials, browser)
      done()
    })

    browser.perform(function (done) {
      checkout.section.checkoutContainer.goToNextStep()
      done()
    })

    browser
      .perform(function (done) {
        checkout.section.checkoutContainer.submitDeliverySection()
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.goToNextStep()
        browser.pause(1000)
        done()
      })
  },

  /**
   * Create new order from the Menu page and leave it at the Payment phase.
   */
  beginCreatingOrderWithoutSubscriptionButStopAtPayment: function (accountCredentials = {
    email: faker.internet.email(),
    password: 'ValidPassword1!'
  }, browser) {
    const menu = browser.page.menu()
    const shared = browser.page.shared()
    const promoModal = shared.section.body
    const checkout = browser.page.checkoutV2()
    const cookiePolicy = browser.page.cookiePolicy()

    browser
      .logJourneyStep('Begin creating order without subscription (transactional order) but stop at payment')
      .url(menu.url())
      .trackDatadog()
      .perform(done => {
        promoModal.submitPromo()
        done()
      })
      .perform(done => {
        cookiePolicy.section.cookiePolicyBanner.dismissCookieBannerIfPresent()
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
        menu.section.boxSummaryDesktop.setPostcode('w3 7un')
        done()
      })
      .perform(done => {
        menu.section.menuContainer.clickContinueAfterPostcodeWasEntered()
        done()
      })
      .perform(done => {
        menu.section.boxSummaryDesktop.selectTuesdayAsDeliveryDay()
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
      .perform(async done => {
        await menu.section.recipes.addRecipes()
        browser.pause(8000)
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
        checkout.section.checkoutContainer.ensureCheckoutLoaded()
        done()
      })
      .perform(done => {
        checkout.section.checkoutContainer.submitAccountSection(accountCredentials)
        done()
      })
      .perform(done => {
        checkout.section.checkoutContainer.goToNextStep()
        done()
      })
      .perform(done => {
        checkout.section.checkoutContainer.submitDeliverySection()
        done()
      })
      .perform(done => {
        checkout.section.checkoutContainer.goToNextStep()
        done()
      })
  }
}
