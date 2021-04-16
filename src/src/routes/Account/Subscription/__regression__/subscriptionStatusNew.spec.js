describe('Given I am logged in', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
    cy.setFeatures([{ feature: 'isNewSubscriptionApiEnabled', value: true }])
  })

  describe('When I am on the /subscription-settings page', () => {
    describe('And the new subscription API is in use', () => {
      describe('And I have subscription active', () => {
        beforeEach(() => {
          cy.visitSubscriptionSettingsPage({
            isSubscriptionActive: true,
            isNewSubscriptionApiEnabled: true,
          })
        })

        it('Then I should see Active Subscription Settings page sections', () => {
          cy.get('[data-testing="your-subscription-details-section"]').should('be.visible')
          cy.get('[data-testing="chef-selects-settings-section"]').should('be.visible')
          cy.get('[data-testing="chef-selects-settings-section"]').should('be.visible')
          cy.get('[data-testing="total-price-section"]').should('be.visible')
          cy.get('[data-testing="skip-a-box-section"]').should('be.visible')
          cy.get('[data-testing="pause-subscription-section"]').should('be.visible')
        })

        it('And I should see Total price section with the right price', () => {
          cy.get('[data-testing="price-per-servings"]').should('have.text', 'Price per Serving£2.85')
          cy.get('[data-testing="total-price"]').should('have.text', 'Total Box Price£34.20')
        })
      })

      describe('And I have subscription inactive', () => {
        beforeEach(() => {
          cy.visitSubscriptionSettingsPage({
            isSubscriptionActive: false,
            isNewSubscriptionApiEnabled: true,
          })
        })

        it('Then I should see Paused Subscription Settings page sections', () => {
          cy.get('[data-testing="resubscribe-section"]').should('be.visible')
          cy.get('[data-testing="order-a-box-section"]').should('be.visible')
        })

        describe('When I click the Resubscribe CTA', () => {
          beforeEach(() => {
            cy.visitSubscriptionSettingsPage({
              isSubscriptionActive: false,
              isNewSubscriptionApiEnabled: true,
            })
            cy.get('[data-testing="resubscribe-cta"]').click()
            cy.wait('@activateSubscription')
          })

          it('Then I should see Active Subscription Settings page sections', () => {
            cy.get('[data-testing="your-subscription-details-section"]').should('be.visible')
            cy.get('[data-testing="chef-selects-settings-section"]').should('be.visible')
            cy.get('[data-testing="chef-selects-settings-section"]').should('be.visible')
            cy.get('[data-testing="total-price-section"]').should('be.visible')
            cy.get('[data-testing="skip-a-box-section"]').should('be.visible')
            cy.get('[data-testing="pause-subscription-section"]').should('be.visible')
          })
        })
      })
    })
  })
})
