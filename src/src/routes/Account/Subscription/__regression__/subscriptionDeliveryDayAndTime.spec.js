describe('Given I am logged in', () => {
  beforeEach(() => {
    cy.login()
  })

  describe('And I am on the /subscription-settings page', () => {
    beforeEach(() => {
      cy.visitSubscriptionSettingsPage()
    })

    it('Then I should see Subscription Settings Page', () => {
      cy.get('[data-testing="subscriptionSettingsPage"]')
        .should('be.visible')
    })

    it('Then I should see the current delivery day', () => {
      cy.get('[data-testing="current-delivery-day"]')
        .should('have.text', 'Saturday')
    })

    it('Then I should see the current delivery time', () => {
      cy.get('[data-testing="current-delivery-time"]')
        .should('have.text', '8am - 7pm')
    })

    describe('When I click “edit” in “Delivery day and time” section', () => {
      beforeEach(() => {
        cy.get('[data-testing="delivery-day-and-time-cta"]')
          .click()
      })

      describe('And I select X delivery slot', () => {
        beforeEach(() => {
          cy.route(
            'PUT',
            /user\/current\/subscription/,
            'fixture:user/userUpdateCurrentSubscription.json')
            .as('updateCurrentSubscription')

          cy.get('[data-testing="delivery-day-and-time-toggle"]')
            .click()

          cy.get('li').contains('Monday 8am - 7pm')
            .click()

          cy.get('[data-testing="delivery-day-and-time-save-cta"]')
            .click()

          cy.wait(['@updateCurrentSubscription'])
        })

        it('Then I should see the updated delivery day and time', () => {
          cy.get('[data-testing="current-delivery-day"]')
            .should('have.text', 'Monday')

          cy.get('[data-testing="current-delivery-time"]')
            .should('have.text', '8am - 7pm')
        })
      })
    })
  })
})
