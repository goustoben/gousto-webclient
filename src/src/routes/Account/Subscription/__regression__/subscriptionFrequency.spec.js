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
      cy.get('[data-testing="current-frequency"]')
        .should('have.text', 'Weekly')
    })

    describe('When I click “edit” in “Frequency” section', () => {
      beforeEach(() => {
        cy.get('[data-testing="box-frequency-cta"]')
          .click()
      })

      describe('And I select Monthly frequency', () => {
        beforeEach(() => {
          cy.route(
            'PUT',
            /user\/current\/subscription/,
            'fixture:user/userUpdateCurrentSubscription.json')
            .as('updateCurrentSubscription')

          cy.get('div').contains('Monthly')
            .click()

          cy.get('[data-testing="box-frequency-save-cta"]')
            .click()

          cy.wait(['@updateCurrentSubscription'])
        })

        it('Then I should see the updated frequency', () => {
          cy.get('[data-testing="current-frequency"]')
            .should('have.text', 'Monthly')
        })
      })
    })
  })
})
