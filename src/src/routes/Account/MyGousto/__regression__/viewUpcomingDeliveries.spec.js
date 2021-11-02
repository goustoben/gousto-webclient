import { selectHeader, selectNoNextOrder, selectNoNextOrderCTA } from './pageUtils/viewUpcomingDeliveries'
import { initialize } from './pageUtils/myGousto'

describe('Given I am logged in', () => {
  const expectedSuccessfulHeader = 'Upcoming delivery'

  describe('I have an upcoming order', () => {
    beforeEach(() => {
      cy.clock(Date.UTC(2020, 1, 1), ['Date'])
      initialize()
    })

    describe('and when on the My Gousto page', () => {
      it('should see my upcoming delivery', () => {
        selectHeader().contains(expectedSuccessfulHeader)
      })

      it('should be able to click the CTA to be redirected to my upcoming deliveries page', () => {
        cy.get('[data-testing=myGoustoNextBoxHelpCTA').click()
        cy.url().should('include', '/my-deliveries')
      })
    })
  })

  describe('I do not have an upcoming order', () => {
    beforeEach(() => {
      cy.clock(Date.UTC(2020, 2, 10), ['Date'])
      initialize()
    })

    describe('and when on the My Gousto page', () => {
      it('should see No scheduled deliveries in the Upcoming delivery section', () => {
        selectNoNextOrder().contains('No scheduled deliveries')
      })

      it('should be able to click the CTA to be redirected to this week\'s menu page', () => {
        selectNoNextOrderCTA().click()
        cy.url().should('include', '/menu')
      })
    })
  })
})
