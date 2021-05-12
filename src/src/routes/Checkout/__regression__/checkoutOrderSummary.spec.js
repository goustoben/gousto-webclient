import { setMocks } from './pageUtils/checkout/checkoutMocks'
import { goToCheckout } from './pageUtils/checkout/checkoutCreateAccount'
import { addRecipeDispatch, showOrderSummary } from './pageUtils/checkout/checkoutRecipeSummary'

describe('Given I’m a gousto logged-out website visitor', () => {
  describe('When I land on the delivery step of the checkout', () => {
    before(() => {
      setMocks({ validPostcode: true })
      goToCheckout()
      addRecipeDispatch()
      showOrderSummary()
    })

    it('Then the order summary should be visible', () => {
      cy.get('[data-testing="checkoutOrderSummary"]').should('be.visible')
    })
  })
})
