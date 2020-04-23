describe('given customer is on the signup/delivery-options page', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('/signup/box-size')
    cy.get('[data-testing="signupBoxSize2Portions"]')
      .should('be.visible')
      .click()
    cy.getDeliveryOptions()
    cy.get('[data-testing="signupPostcodeInput"]')
      .type('E1 7JB', { delay: 80 })
      .should('have.value', 'E1 7JB')
    cy.get('[data-testing="signupPostcodeCTADesktop"]').click()
    cy.wait('@deliveries')
  })

  describe('when show me recipes button is clicked', () => {
    beforeEach(() => {
      cy.fixture('signupWizard/deliveryDay').as('delivery-day')
      cy.route('GET', /delivery_day\/[0-9]{4}\/stock/, '@delivery-day').as('delivery-day')
      cy.get('[data-testing="signupDeliveryCTA"]')
        .should('be.visible')
        .click()
    })

    it('should take a user to a menu page', () => {
      cy.wait('@delivery-day')
      cy.url().should('include', '/menu')
    })
  })
})
