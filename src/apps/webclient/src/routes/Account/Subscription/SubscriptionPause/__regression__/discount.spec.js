describe('Given I am logged in', () => {
  beforeEach(() => {
    cy.stubAll3rdParties()
    cy.login()
  })

  describe('And I am on the subscription-settings page', () => {
    describe.skip('And the multi skip feature flag is enabled', () => {
      /*
      Skipping this for the moment as it's causing issues but is currently
      turned off via feature flag.
       */
      beforeEach(() => {
        cy.visitSubscriptionSettingsPage({
          isSubscriptionActive: true,
          features: [
            { feature: 'isMultiSkipEnabled', value: true }
          ]
        })
      })

      describe('When I click on “Pause Subscription”', () => {
        beforeEach(() => {
          cy.route(
            'GET',
            /subpauseosr\/v1\/subscriptionpauserecovery/,
            'fixture:subscription/subscriptionPauseRecovery.json'
          )

          cy.get('[data-testing="pause-subscription-cta"]')
            .click()
        })

        describe('And I click "Continue to Pause"', () => {
          beforeEach(() => {
            cy
              .get('[data-testing="multi-skip-continue-to-pause"]')
              .click()
          })

          it('Then I should see the Subscription Pause OSR modal', () => {
            cy.get('[data-testing="pause-discount-modal"]').should('exist')
          })

          it('And I should see the available discount', () => {
            cy.get('[data-testing="pause-discount-offer"]').should('have.text', 'You have 40% off on your next order')
          })
        })
      })
    })
  })
})
