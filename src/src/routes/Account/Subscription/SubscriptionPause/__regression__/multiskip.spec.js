describe('Given I am logged in', () => {
  beforeEach(() => {
    cy.login()
  })

  describe('And I am on the /subscription-settings page', () => {
    describe('And the multi skip feature flag is enabled', () => {
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

        describe('And I skip the first available box', () => {
          beforeEach(() => {
            cy.route(
              'DELETE',
              /order/,
              'fixture:order/delete.json'
            )

            cy.get('[data-testing="multi-skip-modal"] label')
              .first()
              .click()

            cy.get('[data-testing="multi-skip-skip-boxes"]')
              .click()
          })

          it('Then I should see the skip box confirmation modal', () => {
            cy.get('[data-testing="modal-header"]')
              .should('have.text', 'Skip successful')
          })
        })
      })
    })
  })
})
