import { withPlatformTags, WEB } from '../../../../utils/regression/tags'
import { initialize } from './pageUtils/myDeliveries'

describe('My Deliveries', () => {
  beforeEach(() => {
    initialize({
      isEligibleFor5Recipes: false
    })
  })

  describe('add box button', () => {
    it('should take the user to the menu', () => {
      cy.get('[data-testing="addBoxButton"]').click()
      cy.url().should('include', 'menu')
    })
  })

  describe('committed orders', () => {
    withPlatformTags(WEB).describe('on web', () => {
      it('should show recipe tiles matching the amount of recipes ordered, without placeholders', () => {
        cy.get('[data-testing="orderCollageContainer"]')
          .first()
          .within(() => {
            cy.get('[data-testing="orderCollageItem"]').should('have.length', 3)
          })
      })
    })
  })

  describe('pending orders', () => {
    it('should be cancellable', () => {
      cy.get('[data-testing="pendingOrder"]').eq(1).click()
      cy.get('[data-testing="cancelButton"]').click()
      cy.wait('@cancelPendingOrder')
      cy.contains('You cannot restore this box').should('be.visible')
      cy.get('[data-testing="pendingOrder"]').eq(1).should('contain', 'Cancelled')
    })

    it('should show the delivery address if the address is within the current user addresses', () => {
      cy.get('[data-testing="pendingOrder"]').first().click()
      cy.get('[data-testing="orderDeliveryAddress"]').should('be.visible')
      cy.get('[data-testing="orderDeliveryAddress"]').contains('My Address').should('exist')
    })

    it('should show the delivery address if the address is not within the current user addresses', () => {
      cy.get('[data-testing="pendingOrder"]').eq(1).click()
      cy.get('[data-testing="orderDeliveryAddress"]').should('be.visible')
      cy.get('[data-testing="orderDeliveryAddress"]').contains('My Deleted Address').should('exist')
    })
  })

  describe('projected deliveries with new subscription api', () => {
    it('should be visible, cancellable and restorable', () => {
      cy.get('[data-testing="projectedDelivery"]').first().get('[data-testing="orderState"]').contains('Scheduled')
      cy.get('[data-testing="projectedDelivery"]').first().click()
      cy.get('[data-testing="cancelButton"]').click()
      cy.wait('@skipDates')
      cy.contains('Cancelled').should('be.visible')
      cy.get('[data-testing="projectedDelivery"]').first().get('[data-testing="orderState"]').contains('Cancelled')
      cy.get('[data-testing="restoreButton"]').click()
      cy.wait('@unSkipDates')
      cy.contains('Scheduled').should('be.visible')
      cy.get('[data-testing="projectedDelivery"]').first().get('[data-testing="orderState"]').contains('Scheduled')
    })

    describe('when all projected deliveries are cancelled', () => {
      it('should show the modal to prompt a user to pause', () => {
        cy.get('[data-testing="projectedDelivery"]').first().get('[data-testing="orderState"]').contains('Scheduled')
        cy.get('[data-testing="projectedDelivery"]').first().click()
        cy.get('[data-testing="cancelButton"]').click()
        cy.wait('@skipDates')
        cy.contains('Cancelled').should('exist')

        cy.get('[data-testing="projectedDelivery"]').eq(1).click()
        cy.get('[data-testing="cancelButton"]').click()
        cy.wait('@skipDates')

        cy.get('[data-testing="cancelledAllBoxesModal"]').should('be.visible')
      })
    })
  })
})
