module.exports = {
  'Order transaction box': function (browser) {
    const shared = browser.page.shared()
    const menu = browser.page.menu()
    const orderConfirmation = browser.page.orderConfirmation()

    browser
      .perform(done => {
        shared.section.body.createUser().then(user => {
          menu.navigate()
          shared.section.body.submitPromo()
          shared.section.body.login(user.customer.email, user.customer.password)
          done()
        }).catch(error => {
          if (error.stack) {
            browser.assert.fail(error.stack)
          } else if (error.message) {
            browser.assert.fail(error.message)
          } else {
            browser.asset.fail(error)
          }

          done()
        })
      })
      .perform(done => {
        shared.section.header.checkUserLoggedIn()
        done()
      })
      .perform(done => {
        menu.navigate()
        done()
      })
      .perform(done => {
        menu.section.recipes.checkIfRecipesVisible()
        done()
      })
      .perform(done => {
        browser.pause(1000)
        menu.section.menuContainer.clickNextButton()
        done()
      })
      .perform(done => {
        browser.pause(1000)
        menu.section.menuContainer.clickDateOfExistingOrder()
        done()
      })
      .perform(done => {
        browser.pause(1000)
        menu.section.menuContainer.clickContinueButton()
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
        browser.pause(1000)
        orderConfirmation.section.orderConfirmationContainer.asyncCheckIfOrderConfirmationPageVisible(browser, done)
      })
      .end()
  },
  tags: ['edit-order', 'order', 'login', 'menu'],
};
