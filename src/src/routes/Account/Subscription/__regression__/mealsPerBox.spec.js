describe('Given I am logged in', () => {
  beforeEach(() => {
    cy.stubAll3rdParties()
    cy.login()
  })

  describe('And I am on the subscription-settings page', () => {
    beforeEach(() => {
      cy.visitSubscriptionSettingsPage({ isSubscriptionActive: true })
    })

    it('Then I should see the current meals per box', () => {
      cy.get('[data-testing="current-meals-per-box"]')
        .should('have.text', '3 meals (£2.85 per serving)')
    })

    describe('When I click “edit” in meals per box section', () => {
      beforeEach(() => {
        cy.get('[data-testing="meals-per-box-cta"]')
          .click()
      })

      describe('And I select "4"', () => {
        beforeEach(() => {
          cy.route(
            'PUT',
            /subscriptioncommand\/v1\/subscriptions\/(.*)/,
            'fixture:user/userUpdateCurrentSubscription.json')
            .as('updateCurrentSubscription')

          cy.get('label').contains('4 meals (£2.39 per serving)')
            .click()

          cy.get('[data-testing="meals-per-box-save-cta"]')
            .click()

          cy.wait(['@updateCurrentSubscription'])
        })

        it('Then I should see the updated meals per box', () => {
          cy.get('[data-testing="current-meals-per-box"]')
            .should('have.text', '4 meals (£2.39 per serving)')
        })
      })
    })
  })
})
