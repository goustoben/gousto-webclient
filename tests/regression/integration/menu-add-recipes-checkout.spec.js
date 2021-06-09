
describe('A user who has not visited the site before lands on the menu', () => {
  const { checkoutAccountBot, menuBot } = cy.bots

  before(() => {
    menuBot.stubAllThirdParties()
    menuBot.prepareForBrand()
    menuBot.prepareForLoggedOutUser()
    menuBot.prepareForSelectionOfFourRecipes(() => {
      menuBot.visitMenu()
      cy.wait('@GET:menu/v1/menus?*')
    })
  })

  describe('and specifies their delivery preferences', () => {
    before(() => {
      menuBot.enterDeliveryPreferences()
    })

    describe('when they select four recipes', () => {
      before(() => {
        menuBot.selectNRecipes()
      })

      describe('and checkout completes within 10 seconds', () => {
        before(() => {
          checkoutAccountBot.checkoutCompletesIn(10)
        })

        it('then they should see an order summary with the correct price.', () => {
          checkoutAccountBot.confirmLocation('/check-out/account')
          checkoutAccountBot.assertOrderSummaryIsVisible({ timeout: 10000 })
          checkoutAccountBot.assertOrderPrice('£34.99', { timeout: 10000 })
        })
      })
    })
  })

  after(() => {
    menuBot.retire()
  })
})
