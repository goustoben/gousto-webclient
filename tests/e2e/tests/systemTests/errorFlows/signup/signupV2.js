module.exports = {
  'Sign-up error for card name with checkout.com from /': function (browser) {
    const home = browser.page.home()
    const menu = browser.page.menu()
    const signup = browser.page.signup()
    const checkout = browser.page.checkoutErrorV2()
    const welcome = browser.page.welcome()
    const myDeliveries = browser.page.myDeliveries()
    const cookiePolicy = browser.page.cookiePolicy()

    browser
      .url(home.api.launchUrl)
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
      .perform(function (done) {
        home.section.hero.goToSignUp()
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
        checkout.section.checkoutContainer.submitPaymentSection(browser)
        done()
      })
      .perform(function (done) {
        checkout.section.checkoutContainer.goToNextStep()
        done()
      })
      .perform(function (done) {
        welcome.section.welcomeContainer.checkIfWelcomePageVisible()
        done()
      })
      .end()
  },
  tags: ['sign-up', 'menu', 'checkout', 'my-deliveries'],
};
