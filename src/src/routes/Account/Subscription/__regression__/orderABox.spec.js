describe('Given I am logged in', () => {
  beforeEach(() => {
    cy.login()
  })

  describe('And I am on the subscription-settings page', () => {
    beforeEach(() => {
      cy.visitSubscriptionSettingsPage({ isSubscriptionActive: false })
    })

    describe('And I click on Order a box CTA', () => {
      beforeEach(() => {
        cy.get('[data-testing="order-a-box-cta"]').click()
      })

      it('Then I should see Menu page', () => {
        cy.url().should('include', '/menu')
      })
    })
  })
})
