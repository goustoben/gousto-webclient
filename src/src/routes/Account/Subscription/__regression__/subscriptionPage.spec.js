describe('Given I am logged in', () => {
  beforeEach(() => {
    cy.login()
  })

  describe('And I am on the /subscription-settings page', () => {
    beforeEach(() => {
      cy.server()
      cy.fixture('user/userCurrent').as('userCurrent')
      cy.route('GET', /user\/current/, '@userCurrent')
      cy.fixture('user/userCurrentOrders').as('userCurrentOrders')
      cy.route('GET', /user\/current\/orders/, '@userCurrentOrders').as('currentOrders')
      cy.fixture('user/userCurrentProjectedDeliveries').as('userCurrentProjectedDeliveries')
      cy.route('GET', /user\/current\/projected-deliveries/, '@userCurrentProjectedDeliveries').as('projectedDeliveries')
      cy.fixture('user/userCurrentAddress').as('userCurrentAddress')
      cy.fixture('user/userCurrentSubscription').as('userCurrentSubscription')

      cy.route('GET', /user\/current\/address/, '@userCurrentAddress').as('currentAddress')
      cy.fixture('user/userCurrentSubscription').as('userCurrentSubscription')

      cy.route('GET', /user\/current\/subscription/, '@userCurrentSubscription').as('currentSubscription')
      cy.fixture('orderSkipRecovery').as('orderSkipRecovery')
      cy.fixture('user/userCurrentSubscriptionDelivery').as('userCurrentSubscriptionDelivery')

      cy.route('GET', /^(?=.*\bdeliveries\/v1.0\/days\b)(?!.*\bpostcode\b).*$/, 'fixture:deliveries/deliveryDays.json').as('deliveryDays')

      cy.visit('/subscription-settings')
      cy.wait(['@currentOrders',
        '@projectedDeliveries',
        '@currentAddress',
        '@currentSubscription',
        '@deliveryDays'])
    })

    it.skip('Then I should see Subscription Settings Page', () => {
      cy.get('[data-testing="subscriptionSettingsPage"]')
        .should('be.visible')
    })

    it.skip('Then I should see the current delivery day', () => {
      cy.get('[data-testing="current-delivery-day"]')
        .should('have.text', 'Saturday')
    })

    it.skip('Then I should see the current delivery time', () => {
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

        it.skip('Then I should see the updated delivery day and time', () => {
          cy.get('[data-testing="current-delivery-day"]')
            .should('have.text', 'Monday')

          cy.get('[data-testing="current-delivery-time"]')
            .should('have.text', '8am - 7pm')
        })
      })
    })
  })
})
