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
        signup.section.deliveryStep.checkIfDeliverySet()
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
      .perform(function (done) {
        menu.section.recipes.addRecipes()
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
  }
}
