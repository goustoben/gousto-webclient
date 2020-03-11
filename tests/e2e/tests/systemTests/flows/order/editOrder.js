module.exports = {
  'Order transaction box': function (browser) {
    const shared = browser.page.shared()
    const menu = browser.page.menu()
    const orderConfirmation = browser.page.orderConfirmation()

    browser
      .perform(done => {
        shared.section.body.createUser().then(user => {
          menu.navigate()
          shared.section.body.login(user.customer.email, user.customer.password)
          done()
        }).catch(error => {
          browser.assert.fail(error)
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
        browser.pause(3000)
        menu.section.menuContainer.goFromMenuToCheckout()
        done()
      })
      .perform(done => {
        browser.pause(1000)
        orderConfirmation.section.orderConfirmationContainer.checkIfOrderConfirmationPageVisible(browser)
        done()
      })
      .end()
  },
  tags: ['edit-order', 'order', 'login', 'menu'],
};
