import { goToCheckout } from './pageUtils/checkout/checkoutCreateAccount'
import { setMocks } from './pageUtils/checkout/checkoutMocks'
import { addRecipeDispatch, showOrderSummary } from './pageUtils/checkout/checkoutRecipeSummary'

describe('Given I’m a gousto logged-out website visitor', () => {
  describe('When I land on the delivery step of the checkout', () => {
    before(() => {
      cy.stubAll3rdParties()
      setMocks({ validPostcode: true })
      goToCheckout()
      addRecipeDispatch()
      showOrderSummary()
    })

    it('Then the recipe summary should be visible', () => {
      cy.get('[data-testing="checkoutRecipeSummary"]').should(
        'contain',
        'Creamy Chicken Potato-Topped Pie',
      )
    })
  })
})
