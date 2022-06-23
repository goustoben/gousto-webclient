describe('Given I am logged in', () => {
  beforeEach(() => {
    cy.stubAll3rdParties()
    cy.login()
    cy.visit('/')
  })

  describe('When I am on the /subscription-settings page', () => {
    describe('And I have subscription active', () => {
      beforeEach(() => {
        cy.visitSubscriptionSettingsPage({
          isSubscriptionActive: true
        })
      })

      it('Then I should see Active Subscription Settings page sections', () => {
        cy.get('[data-testing="your-subscription-details-section"]').should('be.visible')
        cy.get('[data-testing="chef-selects-settings-section"]').should('be.visible')
        cy.get('[data-testing="skip-a-box-section"]').should('be.visible')
        cy.get('[data-testing="pause-subscription-section"]').should('be.visible')
      })
    })

    describe('And I have subscription inactive', () => {
      beforeEach(() => {
        cy.visitSubscriptionSettingsPage({
          isSubscriptionActive: false
        })
      })

      it('Then I should see Paused Subscription Settings page sections', () => {
        cy.get('[data-testing="resubscribe-section"]').should('be.visible')
        cy.get('[data-testing="order-a-box-section"]').should('be.visible')
      })

      describe('When I click the Resubscribe CTA', () => {
        beforeEach(() => {
          cy.visitSubscriptionSettingsPage({
            isSubscriptionActive: false
          })
          cy.get('[data-testing="resubscribe-cta"]').click()
          cy.wait('@activateSubscription')
        })

        it('Then I should see Active Subscription Settings page sections', () => {
          cy.get('[data-testing="your-subscription-details-section"]').should('be.visible')
          cy.get('[data-testing="chef-selects-settings-section"]').should('be.visible')
          cy.get('[data-testing="skip-a-box-section"]').should('be.visible')
          cy.get('[data-testing="pause-subscription-section"]').should('be.visible')
        })
      })
    })
  })
})
