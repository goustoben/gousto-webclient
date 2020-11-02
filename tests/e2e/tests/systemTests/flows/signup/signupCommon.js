module.exports = {
  // Don't treat this file as a test module because it's a part of several
  // flows.
  '@disabled': true,

  performSignUpFlowUpToPaymentStep: function (browser, url) {
    const home = browser.page.home()
    const menu = browser.page.menu()
    const shared = browser.page.shared()
    const promoModal = shared.section.body
    const signup = browser.page.signup()
    const checkout = browser.page.checkoutV2()
    const cookiePolicy = browser.page.cookiePolicy()

    browser
      .url(url || home.api.launchUrl)
      .perform(function (done) {
        cookiePolicy.section.cookiePolicyBanner.checkIfCookieBannerVisible()
        done()
      })
      .perform(function (done) {
        cookiePolicy.section.cookiePolicyBanner.clickCookiePolicyBannerBtn()
        done()
      })
      .perform(function (done) {
        cookiePolicy.section.cookiePolicyBanner.checkIfCookieBannerNotPresent()
        done()
      })
      .execute(`document.querySelector('[data-testing="homepageHeroCTA"]').scrollIntoView(false)`)
      .pause(3000)
      .perform(function (done) {
        home.section.hero.goToSignUp()
        done()
      })
      .perform(function (done) {
        promoModal.submitPromo()
        done()
      })
      .perform(function (done) {
        browser.pause(1000)
        signup.section.boxSizeStep.goToNextStep()
        done()
      })
      .perform(function (done) {
        browser.pause(1000)
        signup.section.postcodeStep.setPostcode()
        done()
      })
      .perform(function (done) {
        browser.pause(1000)
        signup.section.postcodeStep.goToNextStep()
        done()
      })
      .perform(function (done) {
        browser.pause(1000)
        signup.section.deliveryStep.checkIfDeliverySet()
        done()
      })
      .perform(function (done) {
        browser.pause(1000)
        signup.section.deliveryStep.goToNextStep()
        done()
      })
      .perform(function (done) {
        browser.pause(1000)
        menu.section.recipes.checkIfRecipesVisible()
        done()
      })
      .perform(function (done) {
        menu.section.recipes.addRecipes()
        browser.pause(1000)
        done()
      })
      .perform(function (done) {
        menu.section.menuContainer.goFromMenuToCheckout()
        done()
      })
    if (browser.globals.browser === 'mobile') {
      browser
        .perform(function (done) {
          checkout.section.checkoutContainer.submitBoxDetailsSection()
          done()
        })
        .perform(function (done) {
          checkout.section.checkoutContainer.goToNextStep()
          done()
        })
    }
    browser.perform(function (done) {
      checkout.section.checkoutContainer.submitAboutYouSection()
      done()
    })
    if (browser.globals.browser !== 'mobile') {
      browser.perform(function (done) {
        checkout.section.checkoutContainer.goToNextStep()
        done()
      })
    }
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
