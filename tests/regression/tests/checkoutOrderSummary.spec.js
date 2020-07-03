import {
  setMocks,
  visitCheckout,
  addRecipeDispatch
} from '../pageUtils/checkout/checkoutRecipeSummary'

describe('Given I’m a gousto logged-out website visitor', () => {
  describe('When I land on the delivery step of the checkout', () => {
    before(() => {
      setMocks()
      visitCheckout()
      cy.wait(['@getDeliveries', '@previewOrder'])
      addRecipeDispatch()

    })
    it('Then the order summary should be visible', () => {
      cy.get('[data-testing="checkoutOrderSummary"]').should('be.visible')
    })
  })
})
