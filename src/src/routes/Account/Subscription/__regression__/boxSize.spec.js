describe('Given I am logged in', () => {
  beforeEach(() => {
    cy.stubAll3rdParties()
    cy.login()
  })

  describe('And I am on the subscription-settings page', () => {
    beforeEach(() => {
      cy.visitSubscriptionSettingsPage({ isSubscriptionActive: true })
    })

    it('Then I should see the current box size', () => {
      cy.get('[data-testing="current-box-size"]')
        .should('have.text', '4 people')
    })

    describe('When I click “edit” in Box Size section', () => {
      beforeEach(() => {
        cy.get('[data-testing="box-size-cta"]')
          .click()
      })

      describe('And I select "2"', () => {
        beforeEach(() => {
          cy.route(
            'PUT',
            /subscriptioncommand\/v1\/subscriptions\/(.*)/,
            'fixture:user/userUpdateCurrentSubscription.json')
            .as('updateCurrentSubscription')

          cy.get('label').contains('2 people')
            .click()

          cy.get('[data-testing="box-size-save-cta"]')
            .click()

          cy.wait(['@updateCurrentSubscription'])
        })

        it('Then I should see the updated frequency', () => {
          cy.get('[data-testing="current-box-size"]')
            .should('have.text', '2 people')
        })
      })
    })
  })
})
