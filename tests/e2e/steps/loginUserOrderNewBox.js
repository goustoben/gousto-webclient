/**
 *  Given the browser session contains logged in user, proceed to order new Box
 */
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

module.exports = {
  orderANewBox,
};
