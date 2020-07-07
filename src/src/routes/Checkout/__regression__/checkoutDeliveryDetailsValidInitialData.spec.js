import { goToCheckout, goToCheckoutDeliveryDetails } from './pageUtils/checkout/checkoutAboutYou'
import { setMocks } from './pageUtils/checkout/checkoutDelivery'
import { withPlatformTags, WEB, MOBILE } from '../../../utils/regression/tags'

describe("Given I'm a logged out user", () => {
  describe('When I land on the delivery detail step of the checkout', () => {
    before(() => {
      cy.setCookie('v1_goustoStateStore_basket_postcode', '"W140EE"')

      setMocks({ validPostcode: true })
      cy.clock(new Date(2020, 4, 1).getTime(), ['Date'])
      goToCheckout()
      goToCheckoutDeliveryDetails()
    })

    it('Then my address has persisted based on what I’ve entered on the delivery address step', () => {
      cy.get('[data-testing="checkoutDeliveryDetailsAddress"]')
        .contains('THE SHEPHERDS BUILDING, CHARECROFT WAY, LONDON, MIDDLESEX, W14 0EE')
    })

    it('And there is an “Edit address“ link I can click on to go back to edit it', () => {
      cy.get('[data-testing="checkoutDeliveryDetailsEditAddress"]').should('exist')
    })

    it('And “Front Porch” is the default safe place', () => {
      cy.get('[data-testing="checkoutDeliveryDetailsInstruction"]')
        .find('.Select-control .Select-value .Select-value-label')
        .contains('Front Porch')
    })

    withPlatformTags(MOBILE).describe('And “Front Porch” can be changed on mobile', () => {
      before(() => {
        cy.get('[data-testing="checkoutDeliveryDetailsInstruction"]')
          .find('select')
          .select('Back Porch')
      })

      it('Then the selected instruction is displayed', () => {
        cy.get('[data-testing="checkoutDeliveryDetailsInstruction"]')
          .find('select')
          .should('have.value', '"Back Porch"')
      })
    })

    withPlatformTags(WEB).describe('And “Front Porch” can be changed on web', () => {
      before(() => {
        cy.get('[data-testing="checkoutDeliveryDetailsInstruction"]')
          .find('.Select-control .Select-value .Select-value-label')
          .click()
          .get('.Select-menu-outer .Select-menu .Select-option')
          .eq(1)
          .click()
      })

      it('Then the selected instruction is displayed', () => {
        cy.get('[data-testing="checkoutDeliveryDetailsInstruction"]')
          .find('.Select-control .Select-value .Select-value-label')
          .contains('Back Porch')
      })
    })
  })
})
