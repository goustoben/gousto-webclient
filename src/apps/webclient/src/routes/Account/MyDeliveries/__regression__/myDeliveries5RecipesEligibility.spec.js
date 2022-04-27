import { withPlatformTags, WEB } from '../../../../utils/regression/tags'
import { initialize } from './pageUtils/myDeliveries'

describe('Given I am on the My deliveries page', () => {
  withPlatformTags(WEB).describe('And I am on web', () => {
    describe('And I am not eligible for 5 recipes', () => {
      beforeEach(() => {
        initialize({
          isEligibleFor5Recipes: false
        })
      })

      describe('And I have a pending order with recipes chosen', () => {
        it('should show me 4 recipe placeholders or tiles in the order summary', () => {
          cy.get('[data-testing="orderCollageContainer"]')
            .eq(1)
            .within(() => {
              cy.get('[data-testing="orderCollageItem"]').should('have.length', 4)
            })
        })

        it('should show me 4 recipe placeholders or tiles in the Recipe Box section', () => {
          cy.get('[data-testing="orderCollageContainer"]')
            .eq(1)
            .click()
          cy.get('[data-testing="orderDetail"]')
            .within(() => {
              cy.get('[data-testing="orderRecipe"]').should('have.length', 4)
            })
        })
      })

      describe('And I have a pending order with no recipes chosen', () => {
        it('should show me 4 recipe placeholders in the order summary', () => {
          cy.get('[data-testing="orderCollageContainer"]')
            .eq(2)
            .within(() => {
              cy.get('[data-testing="orderCollageItem"]').should('have.length', 4)
            })
        })

        it('should show me 4 recipe placeholders or tiles in the Recipe Box section', () => {
          cy.get('[data-testing="orderCollageContainer"]')
            .eq(2)
            .click()
          cy.get('[data-testing="orderDetail"]')
            .within(() => {
              cy.get('[data-testing="orderRecipe"]').should('have.length', 4)
            })
        })
      })
    })

    describe('And I am eligible for 5 recipes', () => {
      beforeEach(() => {
        initialize({
          isEligibleFor5Recipes: true
        })
      })

      describe('And I have a pending order with recipes chosen', () => {
        it('should show me 5 recipe placeholders or tiles in the order summary', () => {
          cy.get('[data-testing="orderCollageContainer"]')
            .eq(1)
            .within(() => {
              cy.get('[data-testing="orderCollageItem"]').should('have.length', 5)
            })
        })

        it('should show me 5 recipe placeholders or tiles in the Recipe Box section', () => {
          cy.get('[data-testing="orderCollageContainer"]')
            .eq(1)
            .click()
          cy.get('[data-testing="orderDetail"]')
            .within(() => {
              cy.get('[data-testing="orderRecipe"]').should('have.length', 5)
            })
        })
      })

      describe('And I have a pending order with no recipes chosen', () => {
        it('should show me 5 recipe placeholders in the order summary', () => {
          cy.get('[data-testing="orderCollageContainer"]')
            .eq(2)
            .within(() => {
              cy.get('[data-testing="orderCollageItem"]').should('have.length', 5)
            })
        })

        it('should show me 5 recipe placeholders or tiles in the Recipe Box section', () => {
          cy.get('[data-testing="orderCollageContainer"]')
            .eq(2)
            .click()
          cy.get('[data-testing="orderDetail"]')
            .within(() => {
              cy.get('[data-testing="orderRecipe"]').should('have.length', 5)
            })
        })
      })
    })
  })
})
