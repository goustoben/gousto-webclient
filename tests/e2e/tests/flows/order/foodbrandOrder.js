module.exports = {
  'Order with a food brand recipe in the box': function (browser) {
    const home = browser.page.home()
    const menu = browser.page.menu()
    const signup = browser.page.signup()
    const checkout = browser.page.checkoutV2()
    const welcome = browser.page.welcome()
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
      .execute(`document.querySelector('[data-testing="homepageHeroCTA"]').scrollIntoView(false)`)
      .pause(3000)
      .perform(function (done) {
        home.section.hero.goToSignUp()
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
        menu.section.recipes.checkIfRecipesVisible()
        done()
      })
      .perform(done => {
        menu.section.menuContainer.clickFoodBrandBanner()
        done()
      })
      .perform(done => {
        menu.section.recipes.addRecipe()
        done()
      })
      .perform(done => {
        menu.section.menuContainer.clickBackToAllRecipesButton()
        done()
      })
      .perform(done => {
        menu.section.recipes.addRecipe()
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
  tags: ['foodbrand-order', 'order', 'login', 'menu'],
};
