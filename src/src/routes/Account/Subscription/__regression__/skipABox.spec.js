describe('Given I am logged in', () => {
  beforeEach(() => {
    cy.login()
  })

  describe('And I am on the /subscription-settings page', () => {
    beforeEach(() => {
      cy.visitSubscriptionSettingsPage({ isSubscriptionActive: true })
    })

    describe('And I click on Skip a box CTA', () => {
      beforeEach(() => {
        cy.get('[data-testing="skip-a-box-cta"]').click()
      })

      it('Then I should see My deliveries page', () => {
        cy.url().should('include', '/my-deliveries')
      })
    })
  })
})
