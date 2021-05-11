describe('Given I am logged in', () => {
  beforeEach(() => {
    cy.stubAll3rdParties()
    cy.login()
  })

  describe('And I am on the subscription-settings page', () => {
    beforeEach(() => {
      cy.visitSubscriptionSettingsPage({ isSubscriptionActive: true })
    })

    it('Then I should see the current frequency', () => {
      cy.get('[data-testing="current-dietary-preference"]')
        .should('have.text', 'Vegetarian')
    })

    describe('When I click “edit” in Dietary Preferences section', () => {
      beforeEach(() => {
        cy.get('[data-testing="dietary-preference-cta"]')
          .click()
      })

      describe('And I select "No dietary preference"', () => {
        beforeEach(() => {
          cy.route(
            'PUT',
            /user\/current\/subscription/,
            'fixture:user/userUpdateCurrentSubscription.json')
            .as('updateCurrentSubscription')

          cy.get('label').contains('No dietary preference')
            .click()

          cy.get('[data-testing="dietary-preference-save-cta"]')
            .click()

          cy.wait(['@updateCurrentSubscription'])
        })

        it('Then I should see the updated frequency', () => {
          cy.get('[data-testing="current-dietary-preference"]')
            .should('have.text', 'No dietary preference')
        })
      })
    })
  })
})
