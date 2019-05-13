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
      .perform((done) => {
        menu.section.menuContainer.setOrderConfirmationFeatureFlag()
        done()
      })
      .perform(done => {
        menu.section.recipes.checkIfRecipesVisible()
        done()
      })
      .perform(done => {
        menu.section.bottomBar.clickNextButton()
        browser.pause(2000)
        done()
      })
      .perform(done => {
        menu.section.bottomBar.clickDateOfExistingOrder()
        browser.pause(2000)
        done()
      })
      .perform(done => {
        menu.section.bottomBar.clickContinueButton()
        done()
      })
      .perform(done => {
        browser.pause(10000)
        done()
      })
      .perform(done => {
        menu.section.menuContainer.goFromMenuToCheckout()
        done()
      })
      .perform(done => {
        orderConfirmation.section.orderConfirmationContainer.checkIfOrderConfirmationPageVisible()
        done()
      })
      .end()
  },
  tags: ['edit-order', 'order', 'login', 'menu'],
};
